import { useState, useEffect } from "react";
import { useFetchCurrent } from "./openweathermap/api";

export function usePersistedState<T>(key: string, defaultValue?: any) {
  const [state, setState] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }

    return defaultValue;
  });
  useEffect(() => {
    if (state !== undefined) localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  function resetState(overrideDefault?: any) {
    if (overrideDefault !== undefined) {
      setState(overrideDefault);
      localStorage.setItem(key, JSON.stringify(overrideDefault));
    } else if (defaultValue) {
      setState(defaultValue);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    } else {
      setState(undefined as any);
      localStorage.removeItem(key);
    }
  }
  return [
    state as T,
    setState as React.Dispatch<React.SetStateAction<T>>,
    resetState,
  ];
}

export function useCurrentWeather() {
  return useFetchCurrent({}, {});
}

export function useSettings() {
  const [settings, setSettings] = usePersistedState("app.settings", {
    imperial: false,
    locale: navigator.language,
  });

  function updateSettings(newSettings: any) {
    setSettings({
      ...settings,
      ...newSettings,
    });
  }

  return {
    settings: settings as { imperial: boolean; locale: string },
    updateSettings,
  };
}

export function usePosition() {
  const [permissionState, setPermissionState] = useState<PermissionState>();
  const [position, setPosition, resetPosition] = usePersistedState(
    "app.lastPosition"
  );
  const successCallback: PositionCallback = (position) => {
    const copy = {
      timestamp: position.timestamp,
      coords: {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
      },
    };
    setPosition(copy);
  };
  const errorCallback: PositionErrorCallback = (error) => {
    console.log(error);
    // denied prompt

    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  // limit running the effect on component mount
  useEffect(() => {
    try {
      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then(function (result) {
          if (result.state === "granted") {
            setPermissionState(result.state);
            navigator.geolocation.getCurrentPosition(
              successCallback,
              errorCallback,
              {}
            );
          } else if (result.state === "prompt") {
            setPermissionState(result.state);
          } else if (result.state === "denied") {
            setPermissionState(result.state);
          }
          result.onchange = function () {
            setPermissionState(result.state);
          };
        });
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (permissionState === "denied") {
      resetPosition();
    }
  }, [permissionState, resetPosition]);

  return {
    permissionState,
    position: position as Position,
    setPosition: successCallback,
  };
}
