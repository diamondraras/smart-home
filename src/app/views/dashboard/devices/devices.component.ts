import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit{
  lightIsActive = false;
  sofaIsActive = false;
  kitchenIsActive = true;
  spotlightisActive = false;

  doorIsOpen = false;
  alarmIsOn = false;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('http://192.168.10.29:3000/api/users').subscribe((res) => {
      console.log(res);
    })
  }

}
