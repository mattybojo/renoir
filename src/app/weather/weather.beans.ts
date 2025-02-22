export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyWeather;
}

export interface DailyWeather {
  time: Date[];
  weatherCode: number[];
  temperature2mMax: number[];
  temperature2mMin: number[];
  sunrise: Float32Array | null;
  sunset: Float32Array | null;
  rainSum: number[];
  windSpeed10mMax: number[];
  windDirection10mDominant: number[];
}

export interface CurrentWeather {
  time: Date;
  temperature2m: number;
  apparentTemperature: number;
  rain: number;
  weatherCode: number;
  windSpeed10m: number;
  windDirection10m: number;
}

export interface WeatherForecast {
  time: Date | undefined;
  weatherCode: number | undefined;
  tempMin: number | undefined;
  tempMax: number | undefined;
  sunrise: number | undefined;
  sunset: number | undefined;
  rain: number | undefined;
  windSpeed: number | undefined;
  windDirection: number | undefined;
}
