import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { PersonService } from '../../shared/service/data/person.service';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {
  // Declare persons$ as an Observable<[]>
  persons$: Observable<any[]>;

  // A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  private searchTerms = new Subject<String>();

  constructor(private personService: PersonService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.persons$ = this.searchTerms.pipe(
       // wait 300ms after each keystroke before considering the term
       debounceTime(300),
       // ignore new term if same as previous term
       distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.personService.searchPerson(term)),
    ); 
  }
}
