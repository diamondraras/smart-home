import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { _ } from 'underscore';

import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  turnOn() {
    return this.http.get('http://192.168.10.21/gpio/1', this.httpOptions);
  }
  turnOff() {
    return this.http.get('http://192.168.10.21/gpio/0', this.httpOptions);
  }
  getDevicesOfType(devices: Device[], type: string) {
    // tslint:disable-next-line:triple-equals
    return devices.filter(device => device.type == type);
  }
  groupDevicesByType(devices: Device[]) {
    return _.groupBy(devices, (device) => device.type);
  }



}
