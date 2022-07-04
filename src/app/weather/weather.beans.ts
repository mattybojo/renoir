export interface Weather {
  coord: Coordinates;
  weather: WeatherData[];
  base: string;
  main: MainData;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  dt: number;
  sys: SystemData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface SystemData {
  type: number;
  id: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface CloudsData {
  all: number;
}

interface WindData {
  speed: number;
  deg: number;
}

interface MainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coordinates {
  lon: number;
  lat: number;
}
