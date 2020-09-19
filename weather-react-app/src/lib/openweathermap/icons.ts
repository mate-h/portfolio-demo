import type { IconType } from '../config';

// https://openweathermap.org/weather-conditions#Icon-list
export default {
  '01d': 'sun.max.fill',
  '01n': 'moon.stars.fill',
  '02d': 'cloud.sun.fill',
  '02n': 'cloud.moon.fill',
  '03d': 'cloud.fill',
  '03n': 'cloud',
  '04d': 'clouds.fill',
  '04n': 'clouds',
  '09d': 'cloud.rain.fill',
  '09n': 'cloud.rain',
  '10d': 'cloud.sun.rain.fill',
  '10n': 'cloud.moon.rain.fill',
  '11d': 'cloud.bolt.rain.fill',
  '11n': 'cloud.bolt.rain',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'cloud.fog.fill',
  '50n': 'cloud.fog',
} as { [key: string]: IconType };
