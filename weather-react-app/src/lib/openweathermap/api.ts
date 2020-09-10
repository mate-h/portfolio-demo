import { API, GetCurrentResponse, GetCurrentParams } from "OpenWeatherMap";
import useFetch, { UseFetch, IncomingOptions } from "use-http";
import { getCurrentUrl, appid } from "../config";

type StatefulHook<T extends (...args: any) => any> = (
  options?: IncomingOptions,
  ...params: Parameters<T>
) => UseFetch<ReturnType<T>>;

const defaultParams: GetCurrentParams = {
  appid,
};

// expiration is 24 hours by default
const defaultOptions: IncomingOptions = {
  persist: true,
};

export const useFetchCurrent: StatefulHook<API["getCurrent"]> = (
  options,
  params
) => {
  const url = new URL(getCurrentUrl);
  url.search = new URLSearchParams({
    ...defaultParams,
    ...params,
  } as any).toString();
  return useFetch<GetCurrentResponse>(
    url.toString(),
    { ...defaultOptions, ...options },
    [...Object.values(params || {})]
  );
};
