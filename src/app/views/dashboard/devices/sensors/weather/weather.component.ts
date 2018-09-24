import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDashboard from './../../../dashboard.reducer';
import * as DashboardActions from './../../../dashboard.actions';
import { Weather } from './weather.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather$: Observable<Weather>;
  constructor(private store: Store<fromDashboard.State>) { }

  ngOnInit() {
    this.weather$ = this.store.select(fromDashboard.getWeather);

    let entity_ids = [];
    entity_ids['temperature'] = 'sensor.owm_temperature';
    entity_ids['humidity'] = 'sensor.owm_humidity';
    entity_ids['condition'] = 'sensor.owm_condition';
    this.store.dispatch(new DashboardActions.LoadWeather(entity_ids));
  }

}
