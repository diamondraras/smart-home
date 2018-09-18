import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Room } from '../../models/room.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() rooms$: Observable<Room[]>;
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

  onUpdateRoomToActive() {
    this.active = 'room';
    console.log(this.active);
  }

  constructor() {}

  ngOnInit() {
  }
}
