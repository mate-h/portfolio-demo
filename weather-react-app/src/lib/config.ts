import { IncomingOptions, UseFetch } from "use-http";

// OpenWeatherMap API config
export const appid = process.env.REACT_APP_API_KEY;
export const apiRoot = process.env.REACT_APP_API_ROOT;
export const getCurrentUrl = `${apiRoot}/data/2.5/weather`;

// IP API config
export const ipApiRoot = process.env.REACT_APP_IP_API_ROOT;
export const getGeolocationUrl = (query?: string) =>
  query ? `${ipApiRoot}/json/${query}` : `${ipApiRoot}/json`;

export type StatefulHook<T extends (...args: any) => any> = (
  options?: IncomingOptions,
  ...params: Parameters<T>
) => UseFetch<ReturnType<T>>;

// expiration is 24 hours by default
export const defaultOptions: IncomingOptions = {
  persist: true,
};

// 20 minute cache life
export const weatherUpdateOptions: IncomingOptions = {
  ...defaultOptions,
  cacheLife: 20 * 60 * 1000,
};

const lookup = {
  "person.crop.circle.fill": 56942,
  "checkmark.circle.fill": 56419,
  "chevron.left": 56713,
  "chevron.right": 56714,
  heart: 57012,
  "heart.fill": 57013,
  star: 57026,
  "star.fill": 57027,
  "star.lefthalf.fill": 57028,
  plus: 56700,
  minus: 56701,
  "trash.fill": 56850,
  circle: 56320,
  "xmark.circle.fill": 56417,
  "circle.lefthalf.fill": 56322,
  "circle.righthalf.fill": 56323,
  doc: 56887,
  "info.circle": 56692,
  "info.circle.fill": 56693,

  cloud: 56770,
  "cloud.fill": 56771,
  "cloud.fog": 56778,
  "cloud.fog.fill": 56779,
  "sun.max.fill": 56750,
  "moon.stars.fill": 56769,
  "cloud.sun.fill": 56789,
  "cloud.moon.fill": 56795,
  clouds: 56802,
  "clouds.fill": 56803,
  "cloud.rain.fill": 56775,
  "cloud.rain": 56774,
  "cloud.sun.rain.fill": 56791,
  "cloud.moon.rain.fill": 56797,
  "cloud.bolt.rain.fill": 56799,
  "cloud.bolt.rain": 56798,
  snow: 56805,
};

export const icon = (name: keyof typeof lookup) => {
  return [56256, lookup[name]]
    .map((n: number) => String.fromCharCode(n))
    .join("");
};
