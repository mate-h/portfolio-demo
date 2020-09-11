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
import { useContainer } from "unstated-next";
import { CurrentPosition, Settings } from "../..";
import { getLangParam } from "../languages";

const defaultParams: GetCurrentParams = {
  appid,
};

export const useFetchCurrent: StatefulHook<API["getCurrent"]> = (
  options,
  params
) => {
  const { position, permissionState } = useContainer(CurrentPosition);

  const { loading, data } = useFetchGeolocation({}, {});

  const {
    settings: { locale },
  } = useContainer(Settings);

  defaultParams.lang = getLangParam(locale);

  const url = new URL(getCurrentUrl);
  const fetchHook = useFetch<GetCurrentResponse>(url.toString(), {
    ...weatherUpdateOptions,
    ...options,
  });

  useEffect(() => {
    // waiting for permission query callback
    if (!position) {
      if (permissionState === undefined) return;
      if (permissionState === "granted" && position === undefined) return;
    }

    const route = (o: GetCurrentParams) => `?${new URLSearchParams(o as any)}`;

    // use latitude and longitude if position is available
    if (position && permissionState !== "denied") {
      fetchHook.get(
        route({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          ...defaultParams,
          ...params,
        })
      );
    }
    // fallback to IP based geolocation
    else if (data) {
      fetchHook.get(
        route({
          lat: data.lat,
          lon: data.lon,
          ...defaultParams,
          ...params,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, permissionState, position, defaultParams.lang]);

  return fetchHook;
};
