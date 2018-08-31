import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Person } from '../../../shared/model/person';
import { Observable, of } from 'rxjs'
import { Configuration } from '../../../components/app/config/configuration';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient, private configuration: Configuration, private messageService: MessageService) { }

  // Getting JSON data
  private getBaseUrl(): string {
    let url = this.configuration.Server;
            
    return url;
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PersonService: ' + message);
  }

  /** CRUD Method: Read an Array of Persons from the Server **/
  getPersons<T>(): Observable<T> {
    const url = `${this.getBaseUrl()}/persons`;

    this.messageService.add('PersonService: fetched persons');

    return this.httpClient.get<T>(url);
    /*.pipe(
      catchError(this.handleError('getPersons'))
    );*/
  }

  /** GET person by id. Will 404 if id not found */
  getPerson<T>(id: number): Observable<T> {

    const url = `${this.getBaseUrl()}/person/${id}`;

    return this.httpClient.get<T>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<T>(`getPerson id=${id}`))
    );
  }

   /** PUT: update an already existing Person by its id */
   updatePerson<T>(person: any ): Observable<T> {
    const id = typeof person === 'number' ? person: person.id;
    const url = `${this.getBaseUrl()}/person${id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.put<Person>(url, person, httpOptions)
      .pipe(
        tap(_ => this.log(`updated person id=${person.id}`)),
        catchError(this.handleError<any>('updatePerson'))
    );
  }

  /** POST: add a new person to the database */
  addPerson<T>(person: any): Observable<T> {
    
    return this.httpClient.post<T>(`${this.getBaseUrl()}/persons`, person, httpOptions)
      .pipe(
        tap((person: any) => console.log(`added person w/ id=${person.id}`)),
        catchError(this.handleError<T>('addPerson', person))
    );
  }

  /** DELETE: delete the person from the server */
  deletePerson(person: any | number): Observable<{}> {
    const id = typeof person === 'number' ? person: person.id;
    const url = `${this.getBaseUrl()}/person/${id}`; // DELETE api/person/{id}

    return this.httpClient.delete(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted person id=${id}`)),
        catchError(this.handleError<any>('deletePerson'))
    );
  }


  /** Resembles GET persons whose name contains search term, which is a query String with the search term.*/
  searchPerson(term: string):Observable<any[]> {
    if(!term.trim()) {
    // if not search term, return empty person array
      return of([]);
    }

    const url = `${this.getBaseUrl()}/person/search/${term}`;

    //return this.httpClient.get<Person[]>(`${this.personUrl}/?familyName=${term}`)
    return this.httpClient.get<any[]>(url)
      .pipe(
        tap(_ => this.log(`found person matching the given search term: "${term}"`),
            res => res.json),
        catchError(this.handleError<any[]>('searchPersons', null))
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