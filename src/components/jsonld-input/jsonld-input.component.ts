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
    docOutput: string;

    constructor(private route : ActivatedRoute,
        private personService: PersonService,
      ) { }

    ngOnInit() : void {
        this.getPersonForInput();
        this.getPersonForOutput();
    }

    getPersonForInput() : void {
        const id = +this.route.snapshot.paramMap.get('id');
    
        this.personService.getPerson(id)
        .subscribe( person => this.person = person );
    }

    getPersonForOutput() : void {
        const idOut = +this.route.snapshot.paramMap.get('id');

        /*this.personService.getPerson(idOut)
        .subscribe( person => this.docOutput = jsonld.expand(JSON.stringify(person, null, 2)));*/
        
        // Returns a Promise Object
        this.personService.getPerson(idOut)
        .subscribe(person => {
            /*this.docOutput = JSON.stringify(person, null, 2)
                .replace(/ /g, '')
                .replace(/:([\w]+)/g, ':"$1"');*/
            this.docOutput = jsonld.expand(JSON.parse(JSON.stringify(person, null, 2)
                .replace(/ /g, '')
                .replace(/:([\w]+)/g, ':"$1"'))).then(
                    result => { return result });
        });
    }
}