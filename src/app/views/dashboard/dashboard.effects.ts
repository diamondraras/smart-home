import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as DashboardActions from './dashboard.actions';

import { Device } from '../../shared/models/device.model';

@Injectable()
export class DashboardEffects {
  url = 'http://localhost:3000/api';

  @Effect()
  toggleDevice$ = this.actions$.ofType(DashboardActions.TOGGLE_DEVICE).pipe(
    map((action: DashboardActions.ToggleDevice) => action.payload),
    switchMap(payload => {
      return this.http.get(this.url).pipe(
        map(res => {
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

  @Effect()
  toggleAlarm$ = this.actions$
    .ofType(DashboardActions.TOGGLE_ALARM)
    .pipe(
      map((action: DashboardActions.ToggleAlarm) => action.payload),
      switchMap((payload: Device) => {
        return this.http.get(this.url).pipe(
          map(res => {
            return new DashboardActions.UpdateAlarm(payload);
          }),
          catchError(() => {
            return of(new DashboardActions.ToggleDeviceFailed());
          })
        );
      })
    );

  @Effect()
  toggleMainDoor$ = this.actions$
    .ofType(DashboardActions.TOGGLE_MAIN_DOOR)
    .pipe(
      map((action: DashboardActions.ToggleMainDoor) => action.payload),
      switchMap((payload: Device) => {
        return this.http.get(this.url).pipe(
          map(res => {
            return new DashboardActions.UpdateMainDoor(payload);
          }),
          catchError(() => {
            return of(new DashboardActions.ToggleDeviceFailed());
          })
        );
      })
    );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
