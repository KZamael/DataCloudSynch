import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../shared/service/data/person.service';
import { Person } from '../../shared/model/person';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: Person[];
  private types: string[] = ['Person', 'Event', 'Place' ];
  private initialize = new Person(null , 'https://schema.org/', this.types[0], '', '', '');
  private model = this.initialize;

  // Stupid placeholders
  submitted = false;

  constructor(private personService: PersonService) {}

  ngOnInit() : void {
    this.getPersons();
  }

  onSubmit() { this.submitted = true; }

  // CRUD Implementation: Read
  getPersons(): void {
    this.personService.getPersons()
    .subscribe(persons => this.persons = persons);
  }

  newPerson() {
    this.model = this.initialize;
  }

  // CRUD implementation: Add
  add(person: Person): void {
    if(!person) { return; }
    this.personService.addPerson( person )
      .subscribe(person => {
        this.persons.push(person);
      });
  }

  // CRUD imlementation: Delete
  delete(person: Person): void {
    this.persons = this.persons.filter(h => h !== person);
    this.personService.deletePerson(person.id).subscribe();
  }

  get diagnostic() { return JSON.stringify(this.model);}
}
