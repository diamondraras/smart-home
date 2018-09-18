import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../../../shared/service/device.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Room } from '../../../../shared/models/room.model';
import { RoomService } from '../../../../shared/service/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: Room;
  roomDeviceTypeList: string[];

  constructor(private roomService: RoomService, private deviceService: DeviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.room = this.roomService.getRoom(params['id']);
      this.roomDeviceTypeList = Object.keys(this.deviceService.groupDevicesByType(this.room.devices));
    });
  }

  loadDeviceOfType(type: string) {
    return this.deviceService.getDevicesOfType(this.room.devices, type);
  }



}
