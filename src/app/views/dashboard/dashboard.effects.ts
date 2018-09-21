import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as DashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
    @Effect() toggleDevice$ = this.actions$
    .ofType(DashboardActions.TOGGLE_DEVICE)
    .pipe(
        map((action: DashboardActions.ToggleDevice) => action.payload),
        switchMap(payload => {
            return this.http.get('http://localhost:3000/api')
            .pipe(
                map((res) => {
                    return new DashboardActions.UpdateDeviceState({
                        roomId: payload.roomId,
                        device: payload.device
                    });
                }),
                catchError(() => {
                    return of(new DashboardActions.ToggleDeviceFailed());
                })
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}
}
