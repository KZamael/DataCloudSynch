export class PersonLocal {

    constructor(
        id: number,
        context: string,
        type: string,
        firstName: string,
        lastName: string,
        birthDate: string){
            this.id = id;
            this.context = context;
            this.type = type;
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthDate = birthDate;
        }

        id: number;
        context: string;
        type: string;
        firstName: string;
        lastName: string;
        birthDate: string;
}