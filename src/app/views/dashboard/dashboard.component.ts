import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';

import { Store } from '@ngrx/store';

import { Room } from '../../shared/models/room.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rooms$: Observable<Room[]>;

  constructor(private store: Store<fromDashboard.State>) {}

  ngOnInit() {
    this.store.dispatch(new DashboardActions.StartApp());
    this.rooms$ = this.store.select(fromDashboard.getRooms);
  }

}
