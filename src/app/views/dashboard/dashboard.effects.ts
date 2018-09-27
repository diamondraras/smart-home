import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, switchMap, concatAll, tap } from 'rxjs/operators';

import * as DashboardActions from './dashboard.actions';
import { Weather, Forecast } from './devices/sensors/weather/weather.model';
import { SensorResponse } from './devices/sensors/sensors.model';

import { Device } from '../../shared/models/device.model';
import { Room } from '../../shared/models/room.model';
import { WeatherService } from './devices/sensors/weather/weather.service';
import { Entry } from '../../shared/models/entry.model';
import { Passing } from '../../shared/models/passing.model';

@Injectable()
export class DashboardEffects {
  backendUrl = 'http://localhost:3000/api';
  apiUrl = 'http://localhost:8123/api/services/switch/toggle';
  serviceUrl = 'http://localhost:8123/api/services';
  bodyRequest = {
    'entity_id': 'switch.builtin_led'
  };

  constructor(private actions$: Actions, private http: HttpClient, private weatherService: WeatherService) {}

  @Effect()
  setRooms$ = this.actions$.ofType(DashboardActions.START_APP).pipe(
    switchMap(() => {
      return this.http.get<Room[]>(`${this.backendUrl}/dev/states`).pipe(
        map(rooms => {
          return new DashboardActions.SetRooms(rooms);
        }),
        catchError(error => {
          return of(new DashboardActions.SetRoomsFailed());
        })
      );
    })
  );

  @Effect()
  setMainDoor = this.actions$.ofType(DashboardActions.START_APP).pipe(
    switchMap(() => {
      return this.http.get<Device>(`${this.backendUrl}/dev/states/mainDoor`).pipe(
        map((mainDoor) => {
          return new DashboardActions.SetMainDoor(mainDoor);
        }),
        catchError(error => {
          return of(new DashboardActions.SetMainDoorFailed());
        })
      );
    })
  );

  @Effect()
  setEntries = this.actions$.ofType(DashboardActions.START_APP).pipe(
    switchMap(() => {
      return this.http.get<Entry[]>(`${this.backendUrl}/entry`)
      .pipe(
        map(entries => entries.sort((a, b) => a.date > b.date ? 1 : -1)),
        map(entries => {
          return new DashboardActions.SetEntries(entries);
        }),
        catchError(error => {
          return of(new DashboardActions.SetEntriesFailed());
        })
      );
    })
  );

  @Effect()
  setPassing = this.actions$.ofType(DashboardActions.START_APP).pipe(
    switchMap(() => {
      return this.http.get<Passing[]>(`${this.backendUrl}/passing`)
      .pipe(
        map(passing => passing.sort((a, b) => a.date > b.date ? 1 : -1)),
        map(passing => {
          return new DashboardActions.SetPassing(passing);
        }),
        catchError(error => {
          return of(new DashboardActions.SetPassingFailed());
        })
      );
    })
  );


  @Effect()
  toggleDevice$ = this.actions$.ofType(DashboardActions.TOGGLE_DEVICE).pipe(
    map((action: DashboardActions.ToggleDevice) => action.payload),
    switchMap(payload => {
      return this.http.post(this.apiUrl, { 'entity_id': payload.device.name }).pipe(
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
        const data = {
          code : 1234,
          entity_id : 'alarm_control_panel.home_alarm'
        }
        const url = this.serviceUrl + '/alarm_control_panel/alarm_arm_away';
        return this.http.post(url, data).pipe(
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
  armAlarm$ = this.actions$
    .ofType(DashboardActions.ARM_ALARM)
    .pipe(
      map((action: DashboardActions.ArmAlarm) => action.payload),
      switchMap((payload: Device) => {
        const data = {
          code : 1234,
          entity_id : 'alarm_control_panel.home_alarm'
        };
        const url = this.serviceUrl + '/alarm_control_panel/alarm_arm_away';
        return this.http.post(url, data).pipe(
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
    disarmAlarm$ = this.actions$
      .ofType(DashboardActions.DISARM_ALARM)
      .pipe(
        map((action: DashboardActions.ArmAlarm) => action.payload),
        switchMap((payload: Device) => {
          const data = {
            code : 1234,
            entity_id : 'alarm_control_panel.home_alarm'
          };
          const url = this.serviceUrl + '/alarm_control_panel/alarm_disarm';
          return this.http.post(url, data).pipe(
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
        return this.http.post(this.apiUrl, { entity_id: payload.name }).pipe(
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
              const temp_begin = 4; // response for temperature begins a array[4]
              const cond_begin = 9; // response for condition begins a array[9]
              const dayOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
              const currentDay = dayOfWeek[d];
                return new DashboardActions.LoadWeatherSuccess({
                      temperature: res[0].state,
                      humidity: res[1].state,
                      condition: res[2].state,
                      date: res[3].state,
                      day: currentDay,
                      forecast: [
                        { day: dayOfWeek[d1], temp_max: res[temp_begin].state, condition: res[cond_begin].state },
                        { day: dayOfWeek[d2], temp_max: res[temp_begin + 1].state, condition: res[cond_begin + 1].state },
                        { day: dayOfWeek[d3], temp_max: res[temp_begin + 2].state, condition: res[cond_begin + 2].state },
                        { day: dayOfWeek[d4], temp_max: res[temp_begin + 3].state, condition: res[cond_begin + 3].state },
                        { day: dayOfWeek[d5], temp_max: res[temp_begin + 4].state, condition: res[cond_begin + 4].state },
                      ]
                  });
                })
            );
}
