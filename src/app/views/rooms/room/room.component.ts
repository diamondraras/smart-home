import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../../shared/service/component.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  constructor(private componentService: ComponentService) { }

  ngOnInit() {
  }

  turnOn() {
    this.componentService.turnOn().subscribe((data) => console.log(data));
  }

  turnOff() {
    this.componentService.turnOff().subscribe((data) => console.log(data));
  }

}
