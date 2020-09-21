import { Door } from "./Door";

export class SurveyForm {
    constructor(
        public ageOfSubject: number,
        public soundFamiliarity: number,
        public gender: string,
        public doorForms: DoorForm[],
        public otherComment: string,
    ){};
}

export class DoorForm {
    constructor(
        public door: Door,
        public emotion: string,
        public confidence: number,
    ){}
}