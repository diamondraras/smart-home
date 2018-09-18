import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { RoomService } from '../../shared/service/room.service';
import { DeviceService } from '../../shared/service/device.service';

import { AccountComponent } from './account/account.component';
import { SensorsComponent } from './devices/sensors/sensors.component';
import { WeatherComponent } from './devices/sensors/weather/weather.component';
import { ActuatorsComponent } from './devices/actuators/actuators.component';
import { DevicesComponent } from './devices/devices.component';
import { HistoryComponent } from './history/history.component';
import { LightComponent } from './devices/actuators/light/light.component';
import { DoorComponent } from './devices/actuators/door/door.component';
import { AlarmComponent } from './devices/actuators/alarm/alarm.component';
import { SyncComponent } from './account/sync/sync.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './rooms/room/room.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    AccountComponent,
    SensorsComponent,
    WeatherComponent,
    ActuatorsComponent,
    DevicesComponent,
    HistoryComponent,
    LightComponent,
    DoorComponent,
    AlarmComponent,
    SyncComponent,
    RoomsComponent,
    RoomComponent
  ],
  providers: [
    RoomService,
    DeviceService
  ]
})
export class DashboardModule { }
