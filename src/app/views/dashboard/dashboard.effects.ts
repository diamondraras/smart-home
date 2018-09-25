import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, switchMap, concatAll } from 'rxjs/operators';

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
            switchMap((payload: any[]) => {
                const entity_id = payload;
                const temp$ = this.http.get('http://localhost:8123/api/states/' + entity_id['temperature']);
                const hum$ = this.http.get('http://localhost:8123/api/states/' + entity_id['humidity']);
                const cond$ = this.http.get('http://localhost:8123/api/states/' + entity_id['condition']);
                const date$ = this.http.get('http://localhost:8123/api/states/' + entity_id['date']);
                 return forkJoin([temp$, hum$, cond$, date$]);
                }),
            map((res: any[]) => {
              const d = new Date(res[3].state); //Create a Date object so we can transform it into days of the week after
              const dayOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
              const currentDay = dayOfWeek[d.getDay()];
                return new DashboardActions.LoadWeatherSuccess({
                      temperature: res[0].state,
                      humidity: res[1].state,
                      condition: res[2].state,
                      date: res[3].state,
                      day: currentDay
                  });
                })
            )
}
