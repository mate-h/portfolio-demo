import React, { useEffect, useState } from "react";
import { createContainer, useContainer } from "unstated-next";
import { Paragraph } from "./components/Paragraph";
import { useFetchCurrent } from "./lib/openweathermap/api";
import { LocationBanner } from "./components/LocationBanner";
import { usePersistedState } from "./lib/hooks";

function useCurrentWeather() {
  return useFetchCurrent({}, {});
}

function usePosition() {
  const [permissionState, setPermissionState] = useState<PermissionState>();
  const [position, setPosition, resetPosition] = usePersistedState(
    "app.lastPosition"
  );
  // run effect on component mount
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (permissionState === "denied") {
      resetPosition();
    }
  }, [permissionState]);

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

  return {
    permissionState,
    position: position as Position,
    setPosition: successCallback,
  };
}

export const CurrentWeather = createContainer(useCurrentWeather);

export const CurrentPosition = createContainer(usePosition);

function Display() {
  const { loading, error, data } = useContainer(CurrentWeather);
  if (loading) return null;

  return <code>{data?.name}</code>;
}

function Display2() {
  const { position } = useContainer(CurrentPosition);
  return <code>{JSON.stringify(position)}</code>;
}

function App() {
  return (
    <CurrentPosition.Provider>
      <CurrentWeather.Provider>
        <main className="container mx-auto">
          <LocationBanner />
          <header className="App-header">
            <Paragraph className="headline6">
              Simple weather application
            </Paragraph>
            <Display />
            <Display2 />
            <br />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </main>
      </CurrentWeather.Provider>
    </CurrentPosition.Provider>
  );
}

export default App;
