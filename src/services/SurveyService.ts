import { SurveyForm } from "../models/SurveyForm";
import { FirestoreService } from "./FirestoreService";
import doorsInJSONFormat from '../doors.json';
import { Door } from "../models/Door";

export async function uploadSurveyToFirestore(form: SurveyForm) {
    await FirestoreService.database.collection("Forms").doc().set(
        form.getAsFirestoreObject()
    );
}

export function getDoorDataInRandomOrder() {
    var doors: Door[] = doorsInJSONFormat.doors;
    shuffle(doors);
    return doors;
}

export function shuffle(array: Array<any>) {
    var m = array.length, t, i;
    
    // While there remain elements to shuffle…
    while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
    
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
}
