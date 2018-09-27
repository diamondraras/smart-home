import { Action } from '@ngrx/store';

import { Room } from '../../shared/models/room.model';
import { Device } from '../../shared/models/device.model';
import { Entry } from '../../shared/models/entry.model';
import { Passing } from '../../shared/models/passing.model';

export const START_APP = '[DASHBOARD] Start App';
export const SET_ENTRIES = '[DASHBOARD] Set Entries';
export const SET_ENTRIES_FAILED = '[DASHBOARD] Set Entries Failed';
export const SET_PASSING = '[DASHBOARD] Set Passing';
export const SET_PASSING_FAILED = '[DASHBOARD] Set Passing Failed';
export const SET_ROOMS = '[DASHBOARD] Set Rooms';
export const SET_ROOMS_FAILED = '[DASHBOARD] Set Rooms Failed';
export const SET_MAIN_DOOR = '[DASHBOARD] Set Main Door';
export const SET_MAIN_DOOR_FAILED = '[DASHBOARD] Set Main Door Failed';
export const ADD_ROOM = '[DASHBOARD] Add Room';
export const TOGGLE_DEVICE = '[DASHBOARD] Toggle Device';
export const TOGGLE_MAIN_DOOR = '[DASHBOARD] Toggle Main Door';
export const TOGGLE_ALARM = '[DASHBOARD] Toggle Alarm';
export const ARM_ALARM = '[DASHBOARD] Arm Alarm';
export const DISARM_ALARM = '[DASHBOARD] Disarm Alarm';
export const TOGGLE_DEVICE_FAILED = '[DASHBOARD] Toggle Device Failed';
export const UPDATE_DEVICE_STATE = '[DASHBOARD] Update Device State';
export const UPDATE_MAIN_DOOR_STATE = '[DASHBOARD] Update Main Door State';
export const UPDATE_ALARM_STATE = '[DASHBOARD] Update Alarm State';
export const LOAD_WEATHER = '[WEATHER] Load weather';
export const LOAD_WEATHER_SUCCESS = '[WEATHER] Load weather success';
export const LOAD_WEATHER_FAILURE = '[WEATHER] Load weather failure';
export const UPDATE_TEMPERATURE = '[WEATHER] Update temperature';
export const UPDATE_CONDITION = '[WEATHER] Update condition';

export class StartApp implements Action {
  readonly type = START_APP;
}

export class SetRooms implements Action {
  readonly type = SET_ROOMS;
  constructor(public payload: Room[]) {}
}

export class SetRoomsFailed implements Action {
  readonly type = SET_ROOMS_FAILED;
}

export class SetMainDoor implements Action {
    readonly type = SET_MAIN_DOOR;
    constructor(public payload: Device) {}
}
export class SetMainDoorFailed implements Action {
  readonly type = SET_MAIN_DOOR_FAILED;
}

export class SetEntries implements Action {
  readonly type = SET_ENTRIES;
  constructor(public payload: Entry[]) {}
}

export class SetEntriesFailed implements Action {
  readonly type = SET_ENTRIES_FAILED;
}

export class SetPassing implements Action {
  readonly type = SET_PASSING;
  constructor(public payload: Passing[]) {}
}
export class SetPassingFailed implements Action {
  readonly type = SET_PASSING_FAILED;
}

export class AddRoom implements Action {
  readonly type = ADD_ROOM;
  constructor(public payload: Room) {}
}

export class ToggleDevice implements Action {
  readonly type = TOGGLE_DEVICE;
  constructor(public payload: { roomId: number; device: Device }) {}
}

export class ToggleMainDoor implements Action {
  readonly type = TOGGLE_MAIN_DOOR;
  constructor(public payload: Device) {}
}

export class ToggleAlarm implements Action {
  readonly type = TOGGLE_ALARM;
  constructor(public payload: Device) {}
}
export class ArmAlarm implements Action {
  readonly type = ARM_ALARM;
  constructor(public payload: Device) {}
}
export class DisarmAlarm implements Action {
  readonly type = DISARM_ALARM;
  constructor(public payload: Device) {}
}

export class ToggleDeviceFailed implements Action {
  readonly type = TOGGLE_DEVICE_FAILED;
}

export class UpdateDeviceState implements Action {
  readonly type = UPDATE_DEVICE_STATE;
  constructor(public payload: { roomId: number; device: Device }) {}
}

export class UpdateAlarm implements Action {
  readonly type = UPDATE_ALARM_STATE;
  constructor(public payload: Device) {}
}

export class UpdateMainDoor implements Action {
  readonly type = UPDATE_MAIN_DOOR_STATE;
  constructor(public payload: Device) {}
}

export class LoadWeather implements Action {
  readonly type = LOAD_WEATHER;
  constructor(public payload: any[]) {}
}

export class LoadWeatherSuccess implements Action {
  readonly type = LOAD_WEATHER_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadWeatherFailure implements Action {
  readonly type = LOAD_WEATHER_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateTemperature implements Action {
  readonly type = UPDATE_TEMPERATURE;
  constructor(public payload: any) {}
}

export class UpdateCondition implements Action {
  readonly type = UPDATE_CONDITION;
  constructor(public payload: any) {}
}

export type Actions =
  | StartApp
  | SetRooms
  | SetRoomsFailed
  | SetMainDoor
  | SetMainDoorFailed
  | SetEntries
  | SetEntriesFailed
  | SetPassing
  | SetPassingFailed
  | AddRoom
  | ToggleDevice
  | ToggleMainDoor
  | ToggleAlarm
  | ArmAlarm
  | DisarmAlarm
  | ToggleDeviceFailed
  | UpdateDeviceState
  | UpdateAlarm
  | UpdateMainDoor
  | LoadWeather
  | LoadWeatherSuccess
  | LoadWeatherFailure
  | UpdateTemperature
  | UpdateCondition;
