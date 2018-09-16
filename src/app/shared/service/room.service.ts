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
      components: [
        { id: 1, type: 'lamp', state: 'off' },
        { id: 2, type: 'door', state: 'open' }
      ]
    },
    {
      id: 2,
      name: 'Living Room',
      components: [
        { id: 1, type: 'lamp', state: 'off' },
        { id: 2, type: 'lamp', state: 'off' },
        { id: 3, type: 'door', state: 'open' },
      ]
    },
    {
      id: 3,
      name: 'Toilet Room',
      components: [
        { id: 1, type: 'lamp', state: 'off' },
        { id: 2, type: 'door', state: 'open' }
      ]
    },
    {
      id: 4,
      name: 'Hall',
      components: [
        { id: 1, type: 'lamp', state: 'off' },
        { id: 2, type: 'door', state: 'open' }
      ]
    }
  ];

  constructor() {}

  getRooms() {
    return this.rooms.slice();
  }
}
