import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, switchMap, concatAll } from 'rxjs/operators';

import * as DashboardActions from './dashboard.actions';
import { Weather, Forecast } from './devices/sensors/weather/weather.model';
import { SensorResponse } from './devices/sensors/sensors.model';

import { Device } from '../../shared/models/device.model';
import { WeatherService } from './devices/sensors/weather/weather.service';

@Injectable()
export class DashboardEffects {
  url = 'http://localhost:8123/api/services/switch/toggle';
  bodyRequest = {
    'entity_id': 'switch.builtin_led'
  };

  constructor(private actions$: Actions, private http: HttpClient, private weatherService: WeatherService) {}

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
                const forecast = this.weatherService.loadForecast();
                 return forkJoin([temp$, hum$, cond$, date$, ...forecast]);
                }),
            map((res: any[]) => {
              const d = new Date(res[3].state).getDay(); // Create a Date object so we can transform it into days of the week after
              const d1 = this.weatherService.nextDay(d);
              const d2 = this.weatherService.nextDay(d + 1);
              const d3 = this.weatherService.nextDay(d + 2);
              const d4 = this.weatherService.nextDay(d + 3);
              const d5 = this.weatherService.nextDay(d + 4);
              const dayOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
              const currentDay = dayOfWeek[d];
                return new DashboardActions.LoadWeatherSuccess({
                      temperature: res[0].state,
                      humidity: res[1].state,
                      condition: res[2].state,
                      date: res[3].state,
                      day: currentDay,
                      forecast: [
                        { day: dayOfWeek[d1], temp_max: res[4].state, condition: res[9].state },
                        { day: dayOfWeek[d2], temp_max: res[5].state, condition: res[10].state },
                        { day: dayOfWeek[d3], temp_max: res[6].state, condition: res[11].state },
                        { day: dayOfWeek[d4], temp_max: res[7].state, condition: res[12].state },
                        { day: dayOfWeek[d5], temp_max: res[8].state, condition: res[13].state },
                      ]
                  });
                })
            )
}
