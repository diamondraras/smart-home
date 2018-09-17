import { Device } from './device.model';

export interface Room {
    id: number;
    name: string;
    devices: Device[];
}
