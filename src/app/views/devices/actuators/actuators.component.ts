import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actuators',
  templateUrl: './actuators.component.html',
  styleUrls: ['./actuators.component.css']
})
export class ActuatorsComponent {

  lightIsActive = false;
  sofaIsActive = false;
  kitchenIsActive = true;
  spotlightIsActive = false;

  doorIsOpen = false;

  alarmIsOn = true;

}
