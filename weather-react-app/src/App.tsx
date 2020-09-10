import React from "react";
import { createContainer, useContainer } from "unstated-next";
import { Paragraph } from "./components/Paragraph";
import { useFetchCurrent } from "./lib/openweathermap/api";

function useCurrentWeather() {
  return useFetchCurrent({}, {});
}

export const CurrentWeather = createContainer(useCurrentWeather);

function Display() {
  const { loading, error, data } = useContainer(CurrentWeather);
  return (
    <code>
      {loading} {error} {JSON.stringify(data)}
    </code>
  );
}

function App() {
  return (
    <CurrentWeather.Provider>
      <main className="container mx-auto">
        <header className="App-header">
          <Paragraph className="headline6">
            Simple weather application
          </Paragraph>
          <Display />
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
  );
}

export default App;
