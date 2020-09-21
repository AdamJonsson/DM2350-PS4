import firebase from "firebase";

export class FirestoreService {

    static database: firebase.firestore.Firestore;
    
    static createDBConnectionToFirestoreProject() {
        const firebaseConfig = {
            apiKey: process.env.DOOR_SURVEY_FIREBASE_API_KEY,
            authDomain: process.env.DOOR_SURVEY_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.DOOR_SURVEY_FIREBASE_PROJECT_ID
        };
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.firestore();
    }
}