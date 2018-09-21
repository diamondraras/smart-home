import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Device } from '../../../../../shared/models/device.model';
import * as fromDashboard from '../../../dashboard.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-actuator',
  templateUrl: './main-actuator.component.html',
  styleUrls: ['./main-actuator.component.css']
})
export class MainActuatorComponent implements OnInit {
  alarm$: Observable<Device>;
  mainDoor$: Observable<Device>;

  constructor(private store: Store<fromDashboard.State>) { }

  ngOnInit() {
    this.alarm$ = this.store.select(fromDashboard.getAlarm);
    this.mainDoor$ = this.store.select(fromDashboard.getMainDoor);
  }

}
