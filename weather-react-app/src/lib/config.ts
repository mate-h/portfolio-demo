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
