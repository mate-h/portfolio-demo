import { API, GetCurrentResponse, GetCurrentParams } from "OpenWeatherMap";
import useFetch from "use-http";
import {
  getCurrentUrl,
  appid,
  StatefulHook,
  weatherUpdateOptions,
} from "../config";
import { useEffect } from "react";
import { useFetchGeolocation } from "../ip-api/api";

const defaultParams: GetCurrentParams = {
  appid,
};

export const useFetchCurrent: StatefulHook<API["getCurrent"]> = (
  options,
  params
) => {
  const { loading, data } = useFetchGeolocation({}, {});

  const url = new URL(getCurrentUrl);
  const fetchHook = useFetch<GetCurrentResponse>(url.toString(), {
    ...weatherUpdateOptions,
    ...options,
  });

  useEffect(() => {
    if (data?.city) {
      fetchHook.get(
        `?${new URLSearchParams({
          q: data?.city,
          ...defaultParams,
          ...params,
        } as any)}`
      );
    }
  }, [loading, data]);

  return fetchHook;
};
