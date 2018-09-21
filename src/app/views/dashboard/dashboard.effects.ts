import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as DashboardActions from './dashboard.actions';
import { Weather } from './devices/sensors/weather/weather.model';
import { SensorResponse } from './devices/sensors/sensors.model';

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

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}
}
