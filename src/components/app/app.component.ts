import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataCloudSynch';

  constructor(private route: ActivatedRoute) {

    //let routeData = route.data as BehaviorSubject<DatevBreadcrumbSegmentData>;

    //routeData.next({ title: 'Home' });
  }
}