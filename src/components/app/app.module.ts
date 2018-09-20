import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { PersonsComponent } from '../persons/persons.component';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { PersonSearchComponent } from '../person-search/person-search.component';
import { DynamicFormComponent } from '../person-form/dynamic-form.component';
import { MessagesComponent } from '../messages/messages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { JSONLDInputComponent } from '../jsonld-input/jsonld-input.component';

import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Configuration } from './config/configuration';
import { PersonService } from '../../shared/service/data/person.service';
import { MessageService } from '../../shared/service/data/message.service';
//import { UiTree } from '../person-form/uitree-component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PersonSearchComponent,
    DynamicFormComponent,
    JSONLDInputComponent,
    //UiTree
  ],
  providers: [
    PersonService, MessageService, Configuration
       // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
