import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Device } from '../../../../../shared/models/device.model';

import * as fromDashboard from '../../../dashboard.reducer';
import * as DashboardActions from '../../../dashboard.actions';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent implements Device, OnInit {
  @Input() id;
  @Input() type;
  @Input() state;
  newState: string;

  constructor(private store: Store<fromDashboard.State>) { }

  ngOnInit() {
  }

  toggleDevice() {
    this.newState = this.state === 'open' ? 'closed' : 'open';
    this.store.dispatch(new DashboardActions.ToggleMainDoor({
      id: this.id,
      type: this.type,
      state: this.newState
    }));
  }
}

