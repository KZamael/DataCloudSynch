import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../shared/model/person';
import { PersonService } from '../../shared/service/data/person.service';


@Component({
    selector: 'app-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.css']
  })
export class PersonFormComponent {
    personForm: FormGroup; // personform is of type Formgroup

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

    createForm() {
        this.personForm = this.fb.group({
            vorname: ['', Validators.required, Validators.minLength(3) ],  // the form control called 'name'
            name: ['', Validators.required, Validators.minLength(4) ],
            geburtsdatum: ''
        });
    }

    get type() { return this.personForm.get('type'); }
    get content() { return this.personForm.get('context'); }
    get vorname() { return this.personForm.get('vorname'); }
    get nachname() { return this.personForm.get('nachname'); }
    get geburtsdatum() { return this.personForm.get('geburtsdatum'); }
}