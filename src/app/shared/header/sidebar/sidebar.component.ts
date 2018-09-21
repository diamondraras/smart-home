import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Room } from '../../models/room.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() rooms$: Observable<Room[]>;

  constructor() {}

  ngOnInit() {
  }
}
