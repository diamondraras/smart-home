import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromDashboard from './../../../dashboard.reducer';
import * as DashboardActions from './../../../dashboard.actions';
import { Weather } from './weather.model';
import { Observable } from 'rxjs';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import { WebsocketService } from '../../../../../_helpers/websocket.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather$: Observable<Weather>;
  listen$: Observable<any>;
  constructor(
    private store: Store<fromDashboard.State>,
    private ws: WebsocketService
    ) {
      this.ws.connect();
     }

  ngOnInit() {
    this.listen$ = this.ws.listen();
    this.listen$.subscribe((msg) => {
      const res = JSON.parse(msg.data);
      if (res.event) {
        if (res.event.data.entity_id === 'sensor.owm_temperature') {
          console.log('temperature changed ', res.event.data.new_state.state);
          this.store.dispatch(new DashboardActions.UpdateTemperature(res.event.data.new_state.state));
        }
      }
    });
    const data = {
      id: 1,
      type: 'subscribe_events',
      event_type: 'state_changed'
    };
    this.ws.sub(data);

    this.weather$ = this.store.select(fromDashboard.getWeather);

    let entity_ids = [];
    entity_ids['temperature'] = 'sensor.owm_temperature';
    entity_ids['humidity'] = 'sensor.owm_humidity';
    entity_ids['condition'] = 'sensor.owm_condition';
    this.store.dispatch(new DashboardActions.LoadWeather(entity_ids));
  }

}
