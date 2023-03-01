const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{
    constructor() {
        this._config = {
            apiKey: "AIzaSyDva9SC0iSEex_tT0hiDfYj65TmsODUWRM",
            authDomain: "whatsapp-clone-716e6.firebaseapp.com",
            projectId: "whatsapp-clone-716e6",
            storageBucket: "whatsapp-clone-716e6.appspot.com",
            messagingSenderId: "331959536225",
            appId: "1:331959536225:web:6dda165482800ceeaf3820",
            measurementId: "G-CGBS9TPKDD"
        }
        this.init();
    }

    init() {
        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }   
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });
            }).catch(err => {
                f(err);
            });
        });
    }
}