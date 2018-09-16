import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './views/account/account.component';
import { DevicesComponent } from './views/devices/devices.component';
import { HistoryComponent } from './views/history/history.component';
import { RoomsComponent } from './views/rooms/rooms.component';
import { RoomComponent } from './views/rooms/room/room.component';

const routes: Routes = [
    { path: '', component: DevicesComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'account', component: AccountComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'room/:id', component: RoomComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
