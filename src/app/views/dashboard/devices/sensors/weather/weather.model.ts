export class Weather {
    entity_id: string | null;
    temperature: number | 0;
    humidity: number | 0;
    condition: string | null;
    date: string | null;
    day: string | null;
    forecast: Forecast[];
}

export class Forecast {
    day: string | null;
    temp_max: number | 0;
    condition: string | null;
}