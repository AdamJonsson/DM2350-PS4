import { Door } from "./Door";

export class SurveyForm {
    constructor(
        public ageOfSubject: string,
        public soundFamiliarity: number,
        public gender: string,
        public doorForms: DoorForm[],
        public otherComment: string,
        public isMobile: boolean,
    ){};

    getAsFirestoreObject() {
        return {
            doorForms: this.doorForms.map(doorForm => doorForm.getAsFirestoreObject()),
            ageOfSubject: this.ageOfSubject,
            soundFamiliarity: this.soundFamiliarity,
            gender: this.gender,
            otherComment: this.otherComment,
            isMobile: this.isMobile
        }
    }
}

export class DoorForm {
    constructor(
        public door: Door,
        public emotion: string,
        public confidence: number,
    ){}

    getAsFirestoreObject() {
        return {
            door: {
                id: this.door.id,
                youtubeURL: this.door.youtubeURL,
            },
            emotion: this.emotion,
            confidence: this.confidence,
        }
    }
}