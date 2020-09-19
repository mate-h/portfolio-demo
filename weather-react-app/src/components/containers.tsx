import type mapboxgl from 'mapbox-gl';
import { ComponentChildren, createContext, h, FunctionComponent } from 'preact';
import { route, RouterOnChangeArgs } from 'preact-router';
import { useContext, useState } from 'preact/hooks';

const EMPTY: unique symbol = Symbol();

export interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: ComponentChildren;
}

export interface Container<Value, State = void> {
  Provider: FunctionComponent<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

export function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value,
): Container<Value, State> {
  let Context = createContext<Value | typeof EMPTY>(EMPTY);

  function Provider(props: ContainerProviderProps<State>) {
    let value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useContainer(): Value {
    let value = useContext(Context);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  }

  return { Provider, useContainer };
}

export function useContainer<Value, State = void>(
  container: Container<Value, State>,
): Value {
  return container.useContainer();
}

import { useLocationWeather, usePosition, useSettings } from '../lib/hooks';

export const CurrentWeather = createContainer(useLocationWeather);

export const CurrentPosition = createContainer(usePosition);

export const Settings = createContainer(useSettings);

export const Mapbox = createContainer(() => {
  const [mapbox, setMapbox] = useState<{
    map?: mapboxgl.Map;
    mapboxgl?: typeof mapboxgl;
  }>({
    map: undefined,
    mapboxgl: undefined,
  });
  return { mapbox, setMapbox };
});

export const RouterContext = createContext<RouterOnChangeArgs | undefined>(
  undefined,
);
export const useRouter: () => [
  RouterOnChangeArgs | undefined,
  typeof route,
] = () => {
  return [useContext(RouterContext), route];
};
