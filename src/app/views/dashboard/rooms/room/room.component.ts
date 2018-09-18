import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Room } from '../../../../shared/models/room.model';

import * as fromDashboard from '../../dashboard.reducer';

import { DeviceService } from '../../../../shared/service/device.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room$: Observable<Room>;
  room: Room;
  roomDeviceTypeList: string[];

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private store: Store<fromDashboard.State>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.room$ = this.store.select(fromDashboard.getRoomById(params['id']));
      this.room$.subscribe(room => {
        this.room = room;
        this.roomDeviceTypeList = Object.keys(this.deviceService.groupDevicesByType(room.devices));
      });
    });
  }

  loadDeviceOfType(type: string) {
    return this.deviceService.getDevicesOfType(this.room.devices, type);
  }
}
