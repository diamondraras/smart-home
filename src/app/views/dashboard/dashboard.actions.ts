import { Action } from '@ngrx/store';

import { Room } from '../../shared/models/room.model';

export const ADD_ROOM = '[DASHBOARD] Add Room';

export class AddRoom implements Action {
    readonly type = ADD_ROOM;
    constructor (public payload: Room) {
    }
}

export type Actions = AddRoom;
