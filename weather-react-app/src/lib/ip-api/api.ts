import { API, GetGeolocationResponse } from "IPAPI";
import useFetch from "use-http";
import { getGeolocationUrl, StatefulHook, defaultOptions } from "../config";

export const useFetchGeolocation: StatefulHook<API["getGeolocation"]> = (
  options,
  params
) => {
  const q = params.query;
  const url = new URL(getGeolocationUrl(q));
  delete params["query"];
  url.search = new URLSearchParams(params as any).toString();
  return useFetch<GetGeolocationResponse>(
    url.toString(),
    { ...defaultOptions, ...options },
    [...Object.values(params || {})]
  );
};
