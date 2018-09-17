import { Injectable } from '@angular/core';

import { Room } from '../models/room.model';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms: Room[] = [
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
  ];

  constructor() {}

  getRooms() {
    return this.rooms.slice();
  }

  getRoom(id: number) {
    // tslint:disable-next-line:triple-equals
    return this.rooms.find(room => room.id == id);
  }
}
