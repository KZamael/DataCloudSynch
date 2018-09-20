import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { PersonService } from '../../shared/service/data/person.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: [
    `.error { color: red; }`
  ],
})

export class DynamicFormComponent implements OnInit {
  // This is where we pass in our person object, representing our dynamic form structure.
  @Input() dataObject;
  form: FormGroup;
  minDate = new Date();
  maxDate = new Date();

  /**
   * These are here for iterating the Data, wie got from the person-detail-component.
   */
  objectProps;
  nestedObjectProps;

  constructor(private location: Location, private personService: PersonService) {}

  ngOnInit(){
    this.initializeForm();
  }

  private initializeForm(){
    /*const get = (pathArr, data) =>
      pathArr.reduce((obj, key) => (obj && obj[key]) ? obj[key] : null, data)

      console.log(get(['address','addressLocality', 'value'], this.dataObject));
    */

    /** 
    * Remap the API to be suitable for iterating over it.
    **/

  this.objectProps = 
  Object.keys(this.dataObject).map(prop => {
    return Object.assign({},{ key: prop }, this.dataObject[prop]);
  }).slice(3, 7);

  /** Setup the form **/
  const formGroup = {};

  for(let prop of Object.keys(this.dataObject)) {
    formGroup[prop] = new FormControl(this.dataObject[prop].value || '', this.mapValidators(this.dataObject[prop].validation));
    /** Address has nested objects, therefore we need to iterate over said objects as well */

    if(prop === 'address'){
    
      this.nestedObjectProps = Object.keys(this.dataObject[prop]).map(element => {
      let back = Object.assign({},{ key: element[prop] }, this.dataObject[prop]);

      return back;
    });

    /**
    * A little bit of static cosmetics; leave out the first and the last Element of the "Address"
    * TODO: Make the selection of Elements for building the Forms dynamic as well, so the
    * user only sees, what he has to see for his use case.
    **/
    this.nestedObjectProps = this.nestedObjectProps.slice(0,4);
  
    /*for(let element of Object.keys(this.dataObject[prop])){
      formGroup[element] = new FormControl(this.dataObject[element].value || '', this.mapValidators(element));
      //console.log(JSON.stringify(element)); //Counter
      //console.log("The prop: " +prop); // address (curent value)
      
      //console.log(JSON.stringify(this.dataObject[prop]));
     
      console.log("The complete one is: " + JSON.stringify(formGroup[element]));
      }*/
    }
  }

  this.form = new FormGroup(formGroup);
  }

  /**
   * @param validators hold the keys for different validation cases.
   */
  private mapValidators(validators) {
      /**
       * Array which hold the string-names of Form-Validators from the backend to iterate over.
       */
      const formValidators = [];

      /** The following Parameters are used by Angular Materials Datepicker.  */
      let UTCYear = new Date();
      const currentYear = UTCYear.getUTCFullYear();
      /**
       * The oldest person ever whose age has been verified is 
       * Jeanne Calment (1875–1997) of France, who died at the age of 122 years, 164 days.
       * https://en.wikipedia.org/wiki/List_of_the_verified_oldest_people
       **/
      const currentMaxLifespan = 122;
      
      if(validators) {
        for(const validation of Object.keys(validators)) {
          if(validation === 'required') {
            formValidators.push(Validators.required);
          } else if(validation === 'minlength') {
            formValidators.push(Validators.minLength(validators[validation]));
          } else if(validation === 'maxlength'){
            formValidators.push(Validators.maxLength(validators[validation]));
          }
          this.minDate.setFullYear(currentYear - currentMaxLifespan);
          this.maxDate.setFullYear(currentYear); 
        }
      }
    return formValidators;
  }

  onSubmit(form) {
    console.log(form);
  }
  
  save(): void {
    this.personService.updatePerson(this.form)
      .subscribe(() => this.goBack());
  }

  goBack() : void {
    this.location.back();
  }
}

/** A persons name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}