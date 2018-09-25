import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDashboard from './../../../dashboard.reducer';
import * as DashboardActions from './../../../dashboard.actions';
import { Weather } from './weather.model';
import { Observable } from 'rxjs';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import { WebsocketService } from '../../../../../_helpers/websocket.service';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather$: Observable<Weather>;
  constructor(
    private store: Store<fromDashboard.State>,
    private weatherService: WeatherService
    ) {
     }

  ngOnInit() {

    this.weatherService.subscribe();

    this.weather$ = this.store.select(fromDashboard.getWeather);

    let entity_ids = [];
    entity_ids['temperature'] = 'sensor.owm_temperature';
    entity_ids['humidity'] = 'sensor.owm_humidity';
    entity_ids['condition'] = 'sensor.owm_condition';
    entity_ids['date'] = 'sensor.date';
    this.store.dispatch(new DashboardActions.LoadWeather(entity_ids));

    this.weatherService.loadForecast();
  }

}
