import firebase from "firebase";
import 'firebase-functions';

export class FirestoreService {

    static database: firebase.firestore.Firestore;
    
    static establishDBConnectionToFirestoreProject() {
        firebase.initializeApp({
            apiKey: "AIzaSyCg2ZG7UwX3q7EdBepCl2clYu_2OUkPysY",
            authDomain: "doorsurvey-10eb6.firebaseapp.com",
            databaseURL: "https://doorsurvey-10eb6.firebaseio.com",
            projectId: "doorsurvey-10eb6",
            storageBucket: "doorsurvey-10eb6.appspot.com",
            messagingSenderId: "828097104176",
            appId: "1:828097104176:web:f6959512ed626ddf97a0f5",
            measurementId: "G-SC6X8Y6V7J"
        });
        this.database = firebase.firestore();
    }

}