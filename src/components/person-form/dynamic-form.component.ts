import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { PersonService } from '../../shared/service/data/person.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: [
    `.error { color: red; }`
  ],
})

export class DynamicFormComponent implements OnInit{
  // This is where we pass in our person object, representing our dynamic form structure.
  @Input() dataObject;
  form: FormGroup;
  objectProps;

   /// Test:
   name: string;
   key: string = 'categories';
   data: Array<Object> = [
     {
       name: "Beverages",
       categories: [
           {
             name: "Pepsi",
             categories: []
           },
           {
             name: "CocaCola",
             categories: [
                 {
                   name: "Coke Diet",
                   categories: []
                 },
                 {
                   name: "Coke Zero",
                   categories: []
                 }
               ]
           }
         ]
     },
     {
       name: "Footwear",
       categories: [
           {
             name: "Sneakers",
             categories: []
           }
         ]
     }
   ];
   // ######################

  constructor(private location: Location, private personService: PersonService) {}

  ngOnInit(){
    // remap the API to be suitable for iterating over it
    this.objectProps = 
        Object.keys(this.dataObject).map(prop => {
            return Object.assign({},{ key: prop }, this.dataObject[prop]);
        });
        console.log(this.objectProps);
    
    // setup the form
    const formGroup = {};
    for(let prop of Object.keys(this.dataObject)) {
      formGroup[prop] = new FormControl(this.dataObject[prop].value || '', this.mapValidators(this.dataObject[prop].validation));
    }

    this.form = new FormGroup(formGroup);
    }

    private mapValidators(validators) {
        const formValidators = [];
      
        if(validators) {
          for(const validation of Object.keys(validators)) {
            if(validation === 'required') {
              formValidators.push(Validators.required);
            } else if(validation === 'min') {
              formValidators.push(Validators.min(validators[validation]));
            }
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

    get keys() { return Object.keys(this.objectProps); }

}