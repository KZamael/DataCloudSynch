export class Person {

    constructor(
        id: number,
        context: string,
        type: string,
        givenName: string,
        familyName: string,
        birthDate: string){
            this.id = id;
            this.context = context;
            this.type = type;
            this.givenName = givenName;
            this.familyName = familyName;
            this.birthDate = birthDate;
        }

        id: number;
        context: string;
        type: string;
        givenName: string;
        familyName: string;
        birthDate: string;
}