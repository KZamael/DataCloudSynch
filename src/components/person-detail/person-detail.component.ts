import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Person } from '../../shared/model/person';
import { PersonService } from '../../shared/service/data/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  @Input() person: Person;

  constructor(private route : ActivatedRoute,
              private personService: PersonService,
              private location: Location
            ) { }

  ngOnInit() : void {
    this.getPerson();
  }

  getPerson() : void {
    const id = +this.route.snapshot.paramMap.get('id');

    // testing
    this.showPersonInLog(id);

    this.personService.getPerson(id)
      .subscribe(person => this.person = person );
  }

  goBack() : void {
    this.location.back();
  }

  save(): void {
    this.personService.updatePerson(this.person)
      .subscribe(() => this.goBack());
  }

  /**Method which shows the mock person in the console */
  showPersonInLog(id: number):void {
    this.personService.getPerson(id).
      subscribe(persons => console.log(
        'Id: ' + persons['id']
      + ', Context: ' + persons['@context']
      + ', First Name: ' + persons['@givenName']
      + ', Family Name: ' + persons['@familyName']
      + ', Type: ' + persons['@type']
      + ', Birthdate: ' + persons['birthDate']
      ));
  }
}
