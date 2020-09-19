import { window } from 'ssr-window';
import { useState, useEffect, StateUpdater } from 'preact/hooks';
import { useFetchLocationWeather } from './openweathermap/api';

export function usePersistedState<T>(
  key: string,
  defaultValue: T,
): [T, StateUpdater<T>, (overrideDefault?: T) => void] {
  const [state, setState] = useState<T>(() => {
    const item = window.localStorage?.getItem(key);
    if (item !== null && item !== undefined) {
      return JSON.parse(item);
    }

    return defaultValue;
  });
  useEffect(() => {
    if (state !== undefined)
      window.localStorage?.setItem(key, JSON.stringify(state));
  }, [key, state]);
  function resetState(overrideDefault?: T) {
    if (overrideDefault !== undefined) {
      setState(overrideDefault);
      window.localStorage?.setItem(key, JSON.stringify(overrideDefault));
    } else {
      setState(defaultValue);
      if (defaultValue !== undefined) {
        window.localStorage?.setItem(key, JSON.stringify(defaultValue));
      } else {
        window.localStorage?.removeItem(key);
      }
    }
  }
  return [state, setState, resetState];
}

export function useLocationWeather() {
  return useFetchLocationWeather({}, {});
}

export type Settings = {
  imperial: boolean;
  locale: string;
  cities: number[];
};

export function useSettings() {
  const [settings, setSettings] = usePersistedState<Settings>('app.settings', {
    imperial: false,
    locale: window.navigator?.language,
    cities: [],
  });

  function updateSettings(newSettings: Partial<Settings>) {
    setSettings({
      ...(settings as Settings),
      ...newSettings,
    });
  }

  return {
    settings,
    updateSettings,
  };
}

export function usePosition() {
  const [permissionState, setPermissionState] = useState<PermissionState>(
    'prompt',
  );
  const [position, setPosition, resetPosition] = usePersistedState<
    Position | undefined
  >('app.lastPosition', undefined);
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
    setPosition(copy as Position);
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
          name: 'geolocation',
        })
        .then(function (result) {
          if (result.state === 'granted') {
            setPermissionState(result.state);
            navigator.geolocation.getCurrentPosition(
              successCallback,
              errorCallback,
              {},
            );
          } else if (result.state === 'prompt') {
            setPermissionState(result.state);
          } else if (result.state === 'denied') {
            setPermissionState(result.state);
          }
          result.onchange = function () {
            setPermissionState(result.state);
          };
        });
    } catch (e) {
      setPermissionState('prompt');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (permissionState === 'denied') {
      resetPosition();
    }
  }, [permissionState, resetPosition]);

  return {
    permissionState,
    position: position as Position,
    setPosition: successCallback,
  };
}
