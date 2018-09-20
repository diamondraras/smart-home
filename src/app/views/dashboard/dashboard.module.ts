import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { dashboardReducer } from './dashboard.reducer';

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
import { ActuatorComponent } from './devices/actuators/actuator/actuator.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', dashboardReducer)
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
    RoomComponent,
    ActuatorComponent
  ],
  providers: [
    DeviceService
  ]
})
export class DashboardModule { }
