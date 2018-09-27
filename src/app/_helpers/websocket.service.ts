import { Injectable } from "@angular/core";
import { $WebSocket } from "angular2-websocket";
import { Observable } from "rxjs";

@Injectable()

export class WebsocketService {
    ws: $WebSocket;

    constructor() {
        this.ws = new $WebSocket('ws://192.168.10.29:8123/api/websocket');
        this.ws.connect();
    }

    connect() {
        const data = {
            type: 'auth',
            api_password: '1234'
        };
        console.log('connected');
        this.ws.send(data).subscribe(() => {});
    }

    listen(): Observable<any> {
        return this.ws.getDataStream();
    }

    sub(data: any) {
        this.ws.send(data).subscribe(() => {});
    }
}
