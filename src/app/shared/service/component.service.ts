import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

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


}
