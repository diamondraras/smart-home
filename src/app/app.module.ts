import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './views/account/account.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/header/sidebar/sidebar.component';
import { NavComponent } from './shared/header/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SensorsComponent } from './views/devices/sensors/sensors.component';
import { WeatherComponent } from './views/devices/sensors/weather/weather.component';
import { ActuatorsComponent } from './views/devices/actuators/actuators.component';
import { DevicesComponent } from './views/devices/devices.component';
import { HistoryComponent } from './views/history/history.component';
import { LightComponent } from './views/devices/actuators/light/light.component';
import { DoorComponent } from './views/devices/actuators/door/door.component';
import { AlarmComponent } from './views/devices/actuators/alarm/alarm.component';
import { SyncComponent } from './views/account/sync/sync.component';
import { RoomService } from './shared/service/room.service';
import { RoomsComponent } from './views/rooms/rooms.component';
import { RoomComponent } from './views/rooms/room/room.component';
import { DeviceService } from './shared/service/device.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NavComponent,
    FooterComponent,
    SensorsComponent,
    WeatherComponent,
    ActuatorsComponent,
    DevicesComponent,
    HistoryComponent,
    LightComponent,
    DoorComponent,
    AlarmComponent,
    AccountComponent,
    SyncComponent,
    RoomsComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DeviceService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
