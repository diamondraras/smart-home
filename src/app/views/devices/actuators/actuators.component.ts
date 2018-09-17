import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../../shared/models/device.model';

@Component({
  selector: 'app-actuators',
  templateUrl: './actuators.component.html',
  styleUrls: ['./actuators.component.css']
})
export class ActuatorsComponent {
  @Input() type: string;
  @Input() devices: Device[];

  lightIsActive = false;
  sofaIsActive = false;
  kitchenIsActive = true;
  spotlightIsActive = false;

  doorIsOpen = false;

  alarmIsOn = true;

}
