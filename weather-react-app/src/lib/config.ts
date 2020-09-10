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
  "person.crop.circle.fill": [56256, 56942],
  "checkmark.circle.fill": [56256, 56419],
  "chevron.left": [56256, 56713],
  "chevron.right": [56256, 56714],
  heart: [56256, 57012],
  "heart.fill": [56256, 57013],
  star: [56256, 57026],
  "star.fill": [56256, 57027],
  "star.lefthalf.fill": [56256, 57028],
  plus: [56256, 56700],
  minus: [56256, 56701],
  "trash.fill": [56256, 56850],
  circle: [56256, 56320],
  "xmark.circle.fill": [56256, 56417],
  "circle.lefthalf.fill": [56256, 56322],
  "circle.righthalf.fill": [56256, 56323],
  doc: [56256, 56887],
  cloud: [56256, 56770],
  "cloud.fill": [56256, 56771],
  "cloud.fog": [56256, 56778],
  "cloud.fog.fill": [56256, 56779],
};

export const icon = (name: keyof typeof lookup) => {
  return lookup[name].map((n: number) => String.fromCharCode(n)).join("");
};
