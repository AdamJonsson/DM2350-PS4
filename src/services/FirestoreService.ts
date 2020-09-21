import firebase from "firebase";

export class FirestoreService {

    static database: firebase.firestore.Firestore;
    
    static establishDBConnectionToFirestoreProject() {
        const firebaseConfig = this.getFirebaseConfig();
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.firestore();
    }

    private static getFirebaseConfig() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return {
                apiKey: process.env.REACT_APP_DOOR_SURVEY_FIREBASE_API_KEY,
                authDomain: process.env.REACT_APP_DOOR_SURVEY_FIREBASE_AUTH_DOMAIN,
                projectId: process.env.REACT_APP_DOOR_SURVEY_FIREBASE_PROJECT_ID
            }
        } else {
            if (process.env.FIREBASE_CONFIG)
                return JSON.parse(process.env.FIREBASE_CONFIG);
        }
    }
}