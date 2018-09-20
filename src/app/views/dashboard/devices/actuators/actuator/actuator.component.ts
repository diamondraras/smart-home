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
  roomId: number;
  @Input() id;
  @Input() type;
  @Input() state;

  constructor(private store: Store<fromDashboard.State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];
  }

  updateStore() {
    this.store.dispatch(new DashboardActions.UpdateDeviceState({
      roomId: this.roomId,
      device: {
        id: this.id,
        type: this.type,
        state: this.state
      }
    }));
  }

  changeLightState() {
    switch (this.state) {
      case 'on':
        this.state = 'off';
        break;
      case 'off':
        this.state = 'on';
    }
    this.updateStore();
  }

  changeDoorState() {
    switch (this.state) {
      case 'open':
        this.state = 'closed';
        break;
      case 'closed':
        this.state = 'open';
    }
    this.updateStore();
  }

  changeAlarmState() {
    switch (this.state) {
      case 'off':
        this.state = 'on';
        break;
      case 'on':
        this.state = 'off';
    }
    this.updateStore();
  }

}
