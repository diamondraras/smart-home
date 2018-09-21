import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as DashboardActions from './dashboard.actions';
import { Weather } from './devices/sensors/weather/weather.model';
import { SensorResponse } from './devices/sensors/sensors.model';

import { Device } from '../../shared/models/device.model';

@Injectable()
export class DashboardEffects {
  url = 'http://localhost:8123/api/services/switch/toggle';
  bodyRequest = {
    'entity_id': 'switch.builtin_led'
  };

  @Effect()
  toggleDevice$ = this.actions$.ofType(DashboardActions.TOGGLE_DEVICE).pipe(
    map((action: DashboardActions.ToggleDevice) => action.payload),
    switchMap(payload => {
      return this.http.post(this.url, this.bodyRequest).pipe(
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
        return this.http.post(this.url, this.bodyRequest).pipe(
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
        return this.http.post(this.url, this.bodyRequest).pipe(
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
    @Effect()
    loadWeather$ = this.actions$
        .ofType(DashboardActions.LOAD_WEATHER)
        .pipe(
            map((action: DashboardActions.LoadWeather) => action.payload),
            switchMap(payload => {
                const entity_id = payload;
                return this.http.get('http://localhost:8123/api/states/' + entity_id)
                        .pipe(
                            map((res: SensorResponse) => {
                                return new DashboardActions.LoadWeatherSuccess({
                                    entity_id: entity_id,
                                    temperature: res.state
                                })
                            }),
                            catchError((err) => {
                                return of(new DashboardActions.LoadWeatherFailure(err));
                            })
                        )
            })
        )
}
