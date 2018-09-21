import { Action } from '@ngrx/store';

import { Room } from '../../shared/models/room.model';
import { Device } from '../../shared/models/device.model';

export const ADD_ROOM               = '[DASHBOARD] Add Room';
export const UPDATE_DEVICE_STATE    = '[DASHBOARD] Update Device State';
export const TOGGLE_DEVICE          = '[DASHBOARD] Toggle Device';
export const TOGGLE_DEVICE_FAILED   = '[DASHBOARD] Toggle Device Failed';
export const LOAD_WEATHER           = '[WEATHER] Load weather';
export const LOAD_WEATHER_SUCCESS   = '[WEATHER] Load weather success';
export const LOAD_WEATHER_FAILURE   = '[WEATHER] Load weather failure';

export class AddRoom implements Action {
    readonly type = ADD_ROOM;
    constructor (public payload: Room) {
    }
}

export class ToggleDevice implements Action {
    readonly type = TOGGLE_DEVICE;
    constructor (public payload: { roomId: number, device: Device}) {}
}

export class UpdateDeviceState implements Action {
    readonly type = UPDATE_DEVICE_STATE;
    constructor (public payload: { roomId: number, device: Device}) {}
}

export class ToggleDeviceFailed implements Action {
    readonly type = TOGGLE_DEVICE_FAILED;
}

export class LoadWeather implements Action {
    readonly type = LOAD_WEATHER;
    constructor(public payload: string) {}
}

export class LoadWeatherSuccess implements Action {
    readonly type = LOAD_WEATHER_SUCCESS;
    constructor(public payload: any) {}
}

export class LoadWeatherFailure implements Action {
    readonly type = LOAD_WEATHER_FAILURE;
    constructor(public payload: any) {}
}

export type Actions = AddRoom | UpdateDeviceState | ToggleDevice | ToggleDeviceFailed | LoadWeather | LoadWeatherSuccess | LoadWeatherFailure;
