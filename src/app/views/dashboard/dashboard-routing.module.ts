import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesComponent } from './devices/devices.component';
import { HistoryComponent } from './history/history.component';
import { AccountComponent } from './account/account.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './rooms/room/room.component';
import { RecognizedFacesComponent } from './settings/recognized-faces/recognized-faces.component';

const routes: Routes = [
  { path: '', component: DevicesComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'account', component: AccountComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'settings', children: [
    {
      path: 'recognized',
      component: RecognizedFacesComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
