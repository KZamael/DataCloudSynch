import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Person } from '../../../shared/model/person';
import { Observable, of } from 'rxjs'

import { catchError, map, tap } from 'rxjs/operators';

var jsonld = require('jsonld');

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  // Getting JSON data
  private getBaseUrl(): string {
    let url = 'http://localhost:8080'; // Url to web api
            
    return url;
  }

  //httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PersonService: ' + message);
  }


  /** CRUD Method: Read an Array of Persons from the Server **/
 getPersons(): Observable<Person[]> {
  const url = `${this.getBaseUrl()}/persons`;

  this.messageService.add('PersonService: fetched persons');

  this.useJSONLD();

  // MOMENTAN an den in-memory-data-service angebunden.
  // INFO: https://stackoverflow.com/questions/49474048/angular-in-memory-web-api-internal-server-error  version 0.5.4 required
  return this.httpClient.get<Person[]>(url)
    .pipe(
      catchError(this.handleError('getPersons',[]))
    );
  }

  useJSONLD(): void{
    var doc_BE = {
      "id": "312",
      "@context": "http://schema.org",
      "@type": "Person",
      "givenName": "Fulan",
      "familyName": "AlFulani",
      "birthDate": "1989-7-3"
    }

    var context = { 
      "@context" : {
        "id" : "@id",
         "@vocab" : "http://schema.org/",
         "@type" : "Person",
         "firstName" : "givenName",
         "lastName" : "familyName",
         "birthDate" : "birthDate"
      }
    };

    // Seems to work:
    /*this.httpClient.get('http://localhost:8080/person/123')
      .subscribe(person => console.log(jsonld.expand(JSON.parse(JSON.stringify(person)
        .replace(/ /g, '')
        .replace(/:([\w]+)/g, ':"$0"')
      ))));*/

    jsonld.compact(doc_BE, context, function(err, compacted) {
      console.log(JSON.stringify(compacted, null, 2));
    });
  }

  /** GET person by id. Will 404 if id not found */
  getPerson(id: number): Observable<Person> {

    const url = `${this.getBaseUrl()}/person/${id}`;

    return this.httpClient.get<Person>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

   /** PUT: update an already existing Person by its id */
   updatePerson(person: Person ): Observable<Person> {
    const id = typeof person === 'number' ? person: person.id;
    const url = `${this.getBaseUrl()}/person/${id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.put<Person>(url, person, httpOptions)
      .pipe(
        tap(_ => this.log(`updated person id=${person.id}`)),
        catchError(this.handleError<any>('updatePerson'))
    );
  }

  /** POST: add a new person to the database */
  addPerson(person: Person): Observable<Person> {

    return this.httpClient.post<Person>(`${this.getBaseUrl()}/persons`, person, httpOptions)
      .pipe(
        tap((person: Person) => this.log(`added person w/ id=${person.id}`)),
        catchError(this.handleError<Person>('addPerson', person))
    );
  }

  /** DELETE: delete the person from the server */
  deletePerson(person: Person | number): Observable<{}> {
    const id = typeof person === 'number' ? person: person.id;
    const url = `${this.getBaseUrl()}/person/${id}`; // DELETE api/person/{id}

    return this.httpClient.delete(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted person id=${id}`)),
        catchError(this.handleError<Person>('deletePerson'))
    );
  }


       // Resembles GET persons whose name contains search term, which is a query String with the search term.
  searchPerson(term: string):Observable<Person[]> {
    if(!term.trim()) {
    // if not search term, return empty hero array
      return of([]);
    }

    const url = `${this.getBaseUrl()}/person/search/${term}`;

    //return this.httpClient.get<Person[]>(`${this.personUrl}/?familyName=${term}`)
    return this.httpClient.get<Person[]>(url)
      .pipe(
        tap(_ => this.log(`found person matching the given search term: "${term}"`),
            res => res.json),
        catchError(this.handleError<Person[]>('searchPersons', null))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {

      //TODO: send the error to remote logging infrastructure
      console.error(error); //log to console instead

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}