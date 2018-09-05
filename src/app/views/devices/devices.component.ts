import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent{
  lightIsActive = false;
  sofaIsActive = false;
  kitchenIsActive = true;
  spotlightisActive = false;

  doorIsOpen = false;
  alarmIsOn = false;
}
