import { Component, OnInit, Input } from '@angular/core';
import * as fromDashboard from '../../../dashboard.reducer';
import * as DashboardActions from '../../../dashboard.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {
  @Input() id;
  @Input() type;
  @Input() state;
  @Input() name;
  newState: string;

  constructor(private store: Store<fromDashboard.State>) { }

  ngOnInit() {
  }

  toggleDevice() {
    this.newState = this.state === 'off' ? 'on' : 'off';
    this.store.dispatch(new DashboardActions.ToggleAlarm({
      id: this.id,
      type: this.type,
      state: this.newState,
      name: this.name
    }));
  }

}
