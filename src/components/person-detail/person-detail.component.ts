import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PersonService } from '../../shared/service/data/person.service';

var jsonld = require('jsonld');

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  @Input() 
        /**
        * Local context-translated person { "firstName", "lastName"
        * instead of {"givenName", "familyName" }
        * This translation happened through running the compaction
        * algorithm for a more Human friendly format.
        * 
        **/ 
        person: any;
        private personKey: string = "Person";

        context: any = {
          "@context": {
              "@vocab": "http://schema.org/",
              "firstName": "givenName",
              "lastName": "familyName",
              "birthDate": "birthDate"
          }
        };

  constructor(private route : ActivatedRoute,
              private personService: PersonService,
              private location: Location
            ) { }

  ngOnInit() : void {
    this.getPerson();
  }

  getPerson() : void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.personService.getPerson(id)
      .subscribe(persons => {
        this.person = persons;
    });

    this.getPersonForCompact(id);
  }

  getPersonForCompact(id: number): void {
    // Returns a Promise Object
    this.personService.getPerson(id)
        .subscribe(person => {
            jsonld.compact(this.quotifyJSON(person), this.context)
                .then(result => {
                  this.validateJSONObject(person, 2, result);
                  //this.showPersonInLog(this.person);
              });
        });
  }

  showPersonInLog(document: any) {
    console.log("Person is: " 
      + document.id + " "
      + document['@type'] + " "
      + document.firstName + " "
      + document.lastName + " "
      + document.birthDate['@value']
    );
  }

  goBack() : void {
    this.location.back();
  }

  save(): void {
    this.personService.updatePerson(this.person)
      .subscribe(() => this.goBack());
  }

  // Validating the Type in the JSON
  validateJSONObject(type: any, method: number, result: any) : string {
    let testType = type['@type'];
    //console.log("Yes, indeed it is a [" + JSON.stringify(testType)+ "]");
    if(Object.is(testType, this.personKey)){
        switch(method){
            case 0:
                //return this.person = type;
            case 1:
                //return this.docExpand = result;
            case 2:
                return this.person = this.stripIdForParsing(result);
            default:
                console.log("We should never get here!");
                break;
        }
    } else { console.log(`Error! Type is not a ${this.personKey}`); 
        return null; 
    }
  }

  /** Strip an Id from its @ value for preventing errors. These errors
   *  oddly enough, occur whenever one does use a normal String for the identifier.
   **/

  stripIdForParsing(document: any) {
    let result = JSON.parse(JSON.stringify(document, null, 2)
      .replace(/ /g, '')
      .replace(/"@id"/gm, '"id"'));
    console.log(result);
    return result;
  }

  /** Creates well formed JSON-LD by quoting all unquoted Elements of the
  *  JSON through a Regex. The Quotation is necessary for parsing JSON with the jsonld.js library.
  **/
  quotifyJSON(document: any) {
    return JSON.parse(JSON.stringify(document, null, 2)
        .replace(/ /gm, '')
        .replace(/:([\w]+)/gm, ':"$1"'));
    }
  }