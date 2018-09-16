import { Component } from './component.model';

export interface Room {
    id: number;
    name: string;
    components: Component[];
}
