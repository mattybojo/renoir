import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCloudBolt, faCloudRain, faCloudShowersHeavy, faCloudSun, faCloudSunRain, faSmog, faSnowflake, faSun, faTemperatureFull } from '@fortawesome/free-solid-svg-icons';

export const translateWeatherCode = (weatherCode: number | undefined): [IconDefinition, string] => {
  switch (weatherCode) {
    case 0:
      // Clear
      return [faSun, 'Clear'];
    case 1: case 2: case 3:
      // Cloudy
      return [faCloudSun, 'Cloudy'];
    case 45: case 48:
      // Fog
      return [faSmog, 'Fog'];
    case 51: case 53: case 55: case 56: case 57:
      // Drizzle
      return [faCloudSunRain, 'Drizzle'];
    case 61: case 63: case 65: case 66: case 67:
      // Rain
      return [faCloudRain, 'Rain'];
    case 71: case 73: case 75:
      // Snow fall
      return [faSnowflake, 'Snow fall'];
    case 77:
      // Snow grains
      return [faSnowflake, 'Snow grains'];
    case 80: case 81: case 82:
      // Rain showers
      return [faCloudShowersHeavy, 'Rain showers'];
    case 85: case 86:
      // Snow showers
      return [faSnowflake, 'Snow showers'];
    case 95: case 96: case 99:
      // Thunderstorm
      return [faCloudBolt, 'Thunderstorms'];
    default: return [faTemperatureFull, ''];
  }
}

export const calculateWindDirection = (angle: number): string => {
  var directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 22.5) % 16;
  return directions[index];
}
