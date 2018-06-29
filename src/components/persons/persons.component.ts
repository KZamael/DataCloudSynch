import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../shared/service/data/person.service';
import { Person } from '../../shared/model/person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: Person[];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.getPersons();
  }

  // CRUD Implementation: Read
  getPersons(): void {
    this.personService.getPersons()
    .subscribe(persons => this.persons = persons);
  }

  add(familyName: string): void {
    familyName = familyName.trim();
    if(!familyName) { return; }
    this.personService.addPerson({ familyName } as Person)
      .subscribe(person => {
        this.persons.push(person);
      });
  }

  delete(person: Person): void {
    this.persons = this.persons.filter(h => h !== person);
    this.personService.deletePerson(person.id).subscribe();
  }
}
