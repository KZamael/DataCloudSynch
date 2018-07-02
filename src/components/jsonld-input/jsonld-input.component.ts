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

    context : any = {
        "@context": {
          "@vocab": "https://schema.org/",
          "firstName": "givenName",
          "lastName": "familyName",
          "Person": "@type",
          "birthDate": "birthDate"
        }
    };

    constructor(private route : ActivatedRoute,
        private personService: PersonService,
      ) {}

    ngOnInit() : void {

        this.getPersonForOutput();
    }

    getPersonForOutput(){
        const id = +this.route.snapshot.paramMap.get('id');

        this.getPersonForInput(id);
        this.getPersonForExpand(id);
        this.getPersonForCompact(id);
    }

    /** Normal JSON from the Server */
    getPersonForInput(id: number) : void {
    
        this.personService.getPerson(id)
        .subscribe( person => this.person = person );
    }

    /** Expanded version of the normal JSON */
    getPersonForExpand(id: number) : void {
        
        // Returns a Promise Object
        this.personService.getPerson(id)
        .subscribe(person => {
            this.docExpand = jsonld.expand(this.quotifyJSON(person))
                .then( result => { 
                    return result;
                });
        });
    }

    getPersonForCompact(id: number) : void {
         // Returns a Promise Object
         this.personService.getPerson(id)
         .subscribe(person => {
             this.docCompact = jsonld.compact(this.quotifyJSON(person), this.context)
                 .then( result => { 
                     return result;
                 });
         });
    }

    /** Creates well formed JSON-LD by quoting all unquoted Elements of the
     *  JSON through a Regex. The Quotation is necessary for parsing JSON with the jsonld.js library.
     */
    quotifyJSON(document: any){
        return JSON.parse(JSON.stringify(document, null, 2)
        .replace(/ /g, '')
        .replace(/:([\w]+)/g, ':"$1"'));
    }

    output(inp) {
        document.body.appendChild(document.createElement('pre')).innerHTML = inp;
    }
}