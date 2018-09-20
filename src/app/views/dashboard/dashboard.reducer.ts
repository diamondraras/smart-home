import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { _ } from 'underscore';

import * as fromRoot from '../../app.reducer';
import * as dashboard from './dashboard.actions';

import { Room } from '../../shared/models/room.model';
import { Device } from '../../shared/models/device.model';

export interface DashboardState {
  rooms: Room[];
}

export interface State extends fromRoot.State {
  dashboard: DashboardState;
}

const initialState: DashboardState = {
  rooms: [
    {
      id: 1,
      name: 'Attic',
      devices: [
        { id: 1, type: 'light', state: 'off' },
        { id: 2, type: 'door', state: 'open' }
      ]
    },
    {
      id: 2,
      name: 'Living Room',
      devices: [
        { id: 1, type: 'light', state: 'off' },
        { id: 2, type: 'light', state: 'off' },
        { id: 3, type: 'door', state: 'open' },
      ]
    },
    {
      id: 3,
      name: 'Toilet Room',
      devices: [
        { id: 1, type: 'light', state: 'off' },
        { id: 2, type: 'door', state: 'open' }
      ]
    },
    {
      id: 4,
      name: 'Hall',
      devices: [
        { id: 1, type: 'light', state: 'off' },
        { id: 2, type: 'door', state: 'open' },
        { id: 3, type: 'alarm', state: 'off' },
      ]
    }
  ]
};

export function dashboardReducer(state = initialState, action: dashboard.Actions) {
  switch (action.type) {
    case dashboard.ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };
    case dashboard.UPDATE_DEVICE_STATE:
      return {
        ...state,
        rooms: state.rooms.map((room: Room) => {
          if (room.id == action.payload.roomId) {
            return {
              ...room,
              devices: room.devices.map(device => device.id == action.payload.device.id ? action.payload.device : device)
            };
          }
          else return room;
        })
      }
    default:
      return state;
  }
}

export const getDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const getRooms = createSelector(getDashboardState, (state: DashboardState) => state.rooms);

export const getRoomById = (id: number) => createSelector(getRooms, (rooms: Room[]) => {
  // tslint:disable-next-line:triple-equal
  return rooms
    .map(room => Object.assign({
      deviceTypeList: Object.keys(_.groupBy(room.devices, (device) => device.type))
    }, room))
    .find(room => room.id == id);
});
