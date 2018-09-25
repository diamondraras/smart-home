import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { WebsocketService } from "./../../../../../_helpers/websocket.service";
import { Store } from "@ngrx/store";
import * as fromDashboard from './../../../dashboard.reducer';
import * as DashboardActions from './../../../dashboard.actions';

@Injectable()

export class WeatherService{

    listen$: Observable<any>;

    constructor(
        private ws: WebsocketService,
        private store: Store<fromDashboard.State>,
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

}
