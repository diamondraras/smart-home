import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  rooms: Room[];
  active = '';

  onUpdateMaisonToActive() {
    this.active = '';
    console.log(this.active);
  }

  onUpdateHistoriqueToActive() {
    this.active = 'historique';
    console.log(this.active);
  }

  onUpdateAccountToActive() {
    this.active = 'account';
    console.log(this.active);
  }

  constructor(private roomSerice: RoomService) {}

  ngOnInit() {
    this.rooms = this.roomSerice.getRooms();
  }
}
