import { DoorForm, SurveyForm } from "../models/SurveyForm";
import { FirestoreService } from "./FirestoreService";
import doorsInJSONFormat from '../doors.json';
import { Door } from "../models/Door";

export async function uploadSurveyToFirestore(form: SurveyForm) {
    await FirestoreService.database.collection("Forms").doc().set(
        form.getAsFirestoreObject()
    );
}

export async function getSurveyAnswers() {
    var result = await FirestoreService.database.collection("Forms").get();
    return result.docs.map(doc => ({...doc.data()}));
}

export function getDoorDataInRandomOrder() {
    var doors: Door[] = doorsInJSONFormat.doors;
    shuffle(doors);
    _preventSameDoorNextToEachOther(doors);
    return doors;
}

function _preventSameDoorNextToEachOther(doors: Door[]) {
    var failed = false;
    var dummyDoor: Door = {
        "id": 0,
        "youtubeURL": "",
        "localFile": "",
        "sound": "",
        "material": ""
    }

    for (let findIndex = 1; findIndex < doors.length; findIndex++) {
        var rightDoor = doors[findIndex];
        var leftDoor = doors[findIndex - 1];
        if (rightDoor.sound == leftDoor.sound) {
            for (let replaceIndex = 1; replaceIndex < doors.length - 1; replaceIndex++) {
                var doorRightFromPotentialReplace = doors[replaceIndex - 1];
                var doorLeftFromPotentialReplace = doors[replaceIndex + 1];

                var doorLeftFromPotentialMove = doors[findIndex - 1];
                var doorRightFromPotentialMove = doors[findIndex + 1] ?? dummyDoor;
                var doorToPotentialMove = doors[replaceIndex];

                var canReplace = (
                    doorRightFromPotentialReplace.sound != rightDoor.sound &&  
                    doorLeftFromPotentialReplace.sound != rightDoor.sound && 
                    doorRightFromPotentialMove.sound != doorToPotentialMove.sound &&
                    doorLeftFromPotentialMove.sound != doorToPotentialMove.sound
                );

                if (canReplace) {
                    var tmpDoor = doors[findIndex];
                    doors[findIndex] = doors[replaceIndex];
                    doors[replaceIndex] = tmpDoor;
                    break;
                }

                failed = true;
            }
        }
    }

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
