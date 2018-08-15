import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Person } from '../../shared/model/person';
import { PersonService } from '../../shared/service/data/person.service';

var jsonld = require('jsonld');

@Component({
    selector: 'app-jsonld-input',
    templateUrl: './jsonld-input.component.html',
    styleUrls: ['./jsonld-input.component.css'],
})
export class JSONLDInputComponent implements OnInit {

    @Input()
    person: Person;
    docExpand: string;
    docCompact: string;
    /** Just a string representation of the Person @type in JSON.
    used for testing purposes. */
    private personKey: string = "Person";

    context: any = {
        "@context": {
            "@vocab": "http://schema.org/",
            "firstName": "givenName",
            "lastName": "familyName",
            "Person": "@type",
            "birthDate": "birthDate"
        }
    };

    constructor(private route: ActivatedRoute, private personService: PersonService) { }

    ngOnInit(): void {
        this.getPersonForOutput();
    }

    getPersonForOutput() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.getPersonForInput(id);
        this.getPersonForExpand(id);
        this.getPersonForCompact(id);
    }

    /** Normal JSON from the Server */
    getPersonForInput(id: number): void {

        this.personService.getPerson(id)
            .subscribe(person => this.validateJSONObject(person, 0, null));
    }

    /** Expanded version of the normal JSON */
    getPersonForExpand(id: number): void {

        // Returns a Promise Object
        this.personService.getPerson(id)
            .subscribe(person => {
                jsonld.expand(this.quotifyJSON(person))
                    .then(result => this.validateJSONObject(person, 1, result));
            });
    }

    getPersonForCompact(id: number): void {
        // Returns a Promise Object
        this.personService.getPerson(id)
            .subscribe(person => {
                jsonld.compact(this.quotifyJSON(person), this.context)
                    .then(result => this.validateJSONObject(person, 2, result));
            });
    }
    
    // Validating the Type in the JSON
    validateJSONObject(type: any, method: number, result: any) : string {
        let testType = type['@type'];
        //console.log("Yes, indeed it is a [" + JSON.stringify(testType)+ "]");
        if(Object.is(testType, this.personKey)){
            console.log(`The given Object is a ${testType} !`);
            switch(method){
                case 0:
                    return this.person = type;
                case 1:
                    return this.docExpand = result;
                case 2:
                    return this.docCompact = result;
                default:
                    console.log("We should never get here!");
                    break;
            }
        } else {  console.log(`Error! Type is not a ${this.personKey}`); 
            return null; 
        }
    }

    /** Creates well formed JSON-LD by quoting all unquoted Elements of the
     *  JSON through a Regex. The Quotation is necessary for parsing JSON with the jsonld.js library.
     */
    quotifyJSON(document: any) {
        return JSON.parse(JSON.stringify(document, null, 2)
            .replace(/ /g, '')
            .replace(/:([\w]+)/g, ':"$1"'));
    }
}