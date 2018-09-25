import { Injectable, OnInit } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { WebsocketService } from "./../../../../../_helpers/websocket.service";
import { Store } from "@ngrx/store";
import * as fromDashboard from './../../../dashboard.reducer';
import * as DashboardActions from './../../../dashboard.actions';
import { HttpClient } from "@angular/common/http";

@Injectable()

export class WeatherService{

    listen$: Observable<any>;
    baseUrl = 'http://localhost:8123';

    constructor(
        private ws: WebsocketService,
        private store: Store<fromDashboard.State>,
        private http: HttpClient
    ) {
        this.ws.connect();
    }

    subscribe() {
        this.listen$ = this.ws.listen();
        this.listen$.subscribe((msg) => {
          const res = JSON.parse(msg.data);
          if (res.event) {
            if (res.event.data.entity_id === 'sensor.owm_temperature') {
              console.log('temperature changed ', res.event.data.new_state.state);
              this.store.dispatch(new DashboardActions.UpdateTemperature(res.event.data.new_state.state));
            }
            if (res.event.data.entity_id === 'sensor.owm_condition') {
              console.log('condition changed ', res.event.data.new_state.state);
              this.store.dispatch(new DashboardActions.UpdateCondition(res.event.data.new_state.state));
            }
          }
        });
        const data = {
          id: 1,
          type: 'subscribe_events',
          event_type: 'state_changed'
        };
        this.ws.sub(data);
    }

    loadForecast() {
      let temp = [];
      let cond = [];
      const temp1$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day1_temperature_max');
      const temp2$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day2_temperature_max');
      const temp3$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day3_temperature_max');
      const temp4$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day4_temperature_max');
      const temp5$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day5_temperature_max');

      const cond1$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day1_condition');
      const cond2$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day2_condition');
      const cond3$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day3_condition');
      const cond4$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day4_condition');
      const cond5$ = this.http.get(this.baseUrl + '/api/states/sensor.yw_day5_condition');

      temp = [temp1$, temp2$, temp3$, temp4$, temp5$];
      cond = [cond1$, cond2$, cond3$, cond4$, cond5$];

      return [...temp, ...cond];
    }

    nextDay(a: number) {
      return (a + 1) % 7;
  }

}
