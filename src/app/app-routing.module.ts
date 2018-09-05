import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './views/account/account.component';
import { DevicesComponent } from './views/devices/devices.component';
import { HistoryComponent } from './views/history/history.component';

const routes: Routes = [
    { path: '', component: DevicesComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'account', component: AccountComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
