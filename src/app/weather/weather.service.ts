import { computed, Injectable, signal } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { fetchWeatherApi } from 'openmeteo';
import { from, take } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherResponse } from './weather.beans';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _weatherData = signal<WeatherResponse | undefined>(undefined);
  public weatherData = computed(() => this._weatherData());

  constructor() { }

  async getWeatherData(): Promise<void> {
    const url: string = 'https://api.open-meteo.com/v1/forecast';
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;
    const params = {
      "latitude": lat,
      "longitude": lon,
      "current": ["temperature_2m", "apparent_temperature", "rain", "weather_code", "wind_speed_10m", "wind_direction_10m"],
      "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "rain_sum", "wind_speed_10m_max", "wind_direction_10m_dominant"],
      "temperature_unit": "fahrenheit",
      "wind_speed_unit": "mph",
      "precipitation_unit": "inch",
      "timezone": "America/Los_Angeles",
    };

    if (environment.production) {
      from(fetchWeatherApi(url, params)).pipe(take(1)).subscribe({
        next: (responses) => {
          // Helper function to form time ranges
          const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

          // Process first location. Add a for-loop for multiple locations or weather models
          const response = responses[0];

          // Attributes for timezone and location
          const utcOffsetSeconds = response.utcOffsetSeconds();
          const timezone = response.timezone();
          const timezoneAbbreviation = response.timezoneAbbreviation();
          const latitude = response.latitude();
          const longitude = response.longitude();

          const current = response.current()!;
          const daily = response.daily()!;

          // Note: The order of weather variables in the URL query and the indices below need to match!
          const weatherResp: WeatherResponse = {
            current: {
              time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
              temperature2m: current.variables(0)!.value(),
              apparentTemperature: current.variables(1)!.value(),
              rain: current.variables(2)!.value(),
              weatherCode: current.variables(3)!.value(),
              windSpeed10m: current.variables(4)!.value(),
              windDirection10m: current.variables(5)!.value(),
            },

            daily: {
              time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
              ),
              weatherCode: Array.from(daily.variables(0)!.valuesArray()!),
              temperature2mMax: Array.from(daily.variables(1)!.valuesArray()!),
              temperature2mMin: Array.from(daily.variables(2)!.valuesArray()!),
              sunrise: daily.variables(3)!.valuesArray()!,
              sunset: daily.variables(4)!.valuesArray()!,
              rainSum: Array.from(daily.variables(5)!.valuesArray()!),
              windSpeed10mMax: Array.from(daily.variables(6)!.valuesArray()!),
              windDirection10mDominant: Array.from(daily.variables(7)!.valuesArray()!),
            },
          };
          this._weatherData.set(weatherResp);
        },
      });
    } else {
      // Use example response to avoid calling API in dev env
      this._weatherData.set({
        "current": {
          "time": new Date("2025-02-22T09:45:00.000Z"),
          "temperature2m": 51.709999084472656,
          "apparentTemperature": 49.02406311035156,
          "rain": 0,
          "weatherCode": 0,
          "windSpeed10m": 3.3554999828338623,
          "windDirection10m": 216.86997985839844
        },
        "daily": {
          "time": [
            new Date("2025-02-22T00:00:00.000Z"),
            new Date("2025-02-23T00:00:00.000Z"),
            new Date("2025-02-24T00:00:00.000Z"),
            new Date("2025-02-25T00:00:00.000Z"),
            new Date("2025-02-26T00:00:00.000Z"),
            new Date("2025-02-27T00:00:00.000Z"),
            new Date("2025-02-28T00:00:00.000Z")
          ],
          "weatherCode": [
            3,
            3,
            3,
            2,
            0,
            3,
            3
          ],
          "temperature2mMax": [
            67.81999969482422,
            70.06999969482422,
            68.82170104980469,
            66.30169677734375,
            70.35169982910156,
            72.42169952392578,
            71.88169860839844
          ],
          "temperature2mMin": [
            40.90999984741211,
            48.55999755859375,
            49.099998474121094,
            49.92169952392578,
            46.68170166015625,
            50.7317008972168,
            52.531700134277344
          ],
          "sunrise": null,
          "sunset": null,
          "rainSum": [
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "windSpeed10mMax": [
            5.8547892570495605,
            5.703253269195557,
            6.6095685958862305,
            9.511855125427246,
            5.149960517883301,
            7.3037285804748535,
            9.574777603149414
          ],
          "windDirection10mDominant": [
            181.36392211914062,
            358.69805908203125,
            310.8268737792969,
            319.05072021484375,
            335.1576232910156,
            326.71368408203125,
            307.2793273925781
          ]
        }
      });
    }
  }
}

