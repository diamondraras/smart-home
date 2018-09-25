import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Device } from '../../../../../shared/models/device.model';

import * as fromDashboard from '../../../../dashboard/dashboard.reducer';
import * as DashboardActions from '../../../../dashboard/dashboard.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actuator',
  templateUrl: './actuator.component.html',
  styleUrls: ['./actuator.component.css']
})
export class ActuatorComponent implements Device, OnInit {
  @Input() id;
  @Input() type;
  @Input() state;
  @Input() name;
  roomId: number;
  newState: string;

  constructor(private store: Store<fromDashboard.State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];
  }
  toggleDevice() {
    switch (this.type) {
      case 'door':
        this.newState = this.state === 'open' ? 'closed' : 'open';
        break;
      default:
        this.newState = this.state === 'off' ? 'on' : 'off';
        break;
    }
    this.store.dispatch(new DashboardActions.ToggleDevice({
      roomId: this.roomId,
      device: {
        id: this.id,
        type: this.type,
        state: this.newState,
        name: this.name
      }
    }));
  }
}
