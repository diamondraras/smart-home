import { Action } from '@ngrx/store';

import { Room } from '../../shared/models/room.model';
import { Device } from '../../shared/models/device.model';

export const ADD_ROOM               = '[DASHBOARD] Add Room';
export const UPDATE_DEVICE_STATE    = '[DASHBOARD] Update Device State';

export class AddRoom implements Action {
    readonly type = ADD_ROOM;
    constructor (public payload: Room) {
    }
}

export class UpdateDeviceState implements Action {
    readonly type = UPDATE_DEVICE_STATE;
    constructor (public payload: { roomId: number, device: Device}) {}
}

export type Actions = AddRoom | UpdateDeviceState ;
