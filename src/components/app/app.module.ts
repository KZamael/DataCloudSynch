import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { PersonsComponent } from '../persons/persons.component';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { MessagesComponent } from '../messages/messages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../../shared/service/data/in-memory-data.service';
import { PersonSearchComponent } from '../person-search/person-search.component';

import { PersonService } from '../../shared/service/data/person.service';
import { MessageService } from '../../shared/service/data/message.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PersonSearchComponent
  ],
  providers: [
    PersonService, MessageService
       // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
