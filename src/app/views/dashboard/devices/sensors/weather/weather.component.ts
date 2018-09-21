import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDashboard from './../../../dashboard.reducer';
import * as DashboardActions from './../../../dashboard.actions';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private store: Store<fromDashboard.State>) { }

  ngOnInit() {
    this.store.dispatch(new DashboardActions.LoadWeather('sensor.owm_temperature'));
  }

}
