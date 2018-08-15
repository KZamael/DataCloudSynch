import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../shared/model/person';
import { PersonService } from '../../shared/service/data/person.service';
import { isContext } from 'vm';


@Component({
    selector: 'app-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.css']
  })
export class PersonFormComponent {
    personFormComp: FormGroup; // personform is of type Formgroup

    constructor(private fb: FormBuilder) { //Inject the formbuilder
        this.createForm();
    }
    
    /*this.personForm = new FormGroup({
      'vorname': new FormControl(this.model.givenName, [
        Validators.required,
        Validators.minLength(4),

      ]),
      'name': new FormControl(this.model.familyName, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'birthDate': new FormControl(this.model.birthDate, Validators.required)
    });*/

    updateProfile() {
        this.personFormComp.patchValue({
            firstName: 'Nancy',
            adress: {
                street: '123 Drew Street'
            }
        });
    }

    onSubmit() {
        console.warn(this.personFormComp.value);
    }

    createForm() {
        this.personFormComp = this.fb.group({
            vorname: ['', Validators.required, Validators.minLength(3) ],  // the form control called 'name'
            name: ['', Validators.required, Validators.minLength(4) ],
            geburtsdatum: ''
        });
    }

    get type() { return this.personFormComp.get('type'); }
    get content() { return this.personFormComp.get('context'); }
    get vorname() { return this.personFormComp.get('vorname'); }
    get nachname() { return this.personFormComp.get('nachname'); }
    get geburtsdatum() { return this.personFormComp.get('geburtsdatum'); }
}