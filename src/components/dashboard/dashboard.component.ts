import { Component, OnInit} from '@angular/core';
import { Person } from '../../shared/model/person';
import { PersonService } from '../../shared/service/data/person.service';
import { fadeIn } from '../../shared/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fadeIn]
})
export class DashboardComponent implements OnInit {

  persons: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }

  // Display only the first eight Persons

  getPersons(): void {
    this.personService.getPersons()
        .subscribe(persons => this.persons = persons.slice(0,8));
  }
}
