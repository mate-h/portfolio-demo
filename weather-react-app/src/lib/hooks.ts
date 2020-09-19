import { window } from 'ssr-window';
import { useState, useEffect, StateUpdater, Ref, useRef } from 'preact/hooks';
import { useFetchLocationWeather } from './openweathermap/api';
import { useFetchGeolocation } from './ip-api/api';
import {
  useContainer,
  CurrentPosition,
  Mapbox,
} from '../components/containers';
import type mapboxgl from 'mapbox-gl';
import { icon, mapboxToken } from './config';

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

export function useMap({ container }: { container: Ref<HTMLElement> }) {
  const { position, permissionState } = useContainer(CurrentPosition);
  const { mapbox, setMapbox } = useContainer(Mapbox);
  const { loading, data } = useFetchGeolocation({}, {});
  useEffect(() => {
    let node: HTMLElement = document.getElementById('mapbox-gl') as HTMLElement;
    if (!node) node = container.current;

    if (!position && !data) return;
    let lon = data?.lon;
    let lat = data?.lat;
    if (position && permissionState !== 'denied') {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
    }

    function renderMap(impl: typeof mapboxgl) {
      const center: mapboxgl.LngLatLike = [lon as number, lat as number];
      const map = new impl.Map({
        container: node,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center, // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      const i = document.createElement('i');
      i.classList.add('text-2xl', 'text-primary');
      i.innerHTML = icon('mappin.and.ellipse');
      const marker = new impl.Marker({
        element: i,
        anchor: 'bottom',
      })
        .setLngLat(center)
        .addTo(map);
      return map;
    }
    if (mapbox.mapboxgl) {
      node.style.display = 'block';
      const parent = container.current.parentElement;
      parent?.removeChild(parent?.firstChild as HTMLElement);
      parent?.appendChild(node);
      mapbox.map?.triggerRepaint();
      window.dispatchEvent(new Event('resize'));
      // renderMap(mapbox.mapboxgl);
    } else {
      const headID = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      headID.appendChild(link);
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css';
      import('mapbox-gl').then(({ default: gl }) => {
        gl.accessToken = mapboxToken as string;
        const map = renderMap(gl);
        setMapbox({
          map,
          mapboxgl: gl,
        });
      });
    }

    return () => {
      node.id = 'mapbox-gl';
      node.style.display = 'none';
      document.body.appendChild(node);
    };
  }, [loading, position]);
}
