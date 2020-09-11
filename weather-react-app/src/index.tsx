import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createContainer } from "unstated-next";
import { useCurrentWeather, usePosition, useSettings } from "./lib/hooks";

export const CurrentWeather = createContainer(useCurrentWeather);

export const CurrentPosition = createContainer(usePosition);

export const Settings = createContainer(useSettings);

ReactDOM.render(
  <React.StrictMode>
    <Settings.Provider>
      <CurrentPosition.Provider>
        <CurrentWeather.Provider>
          <App />
        </CurrentWeather.Provider>
      </CurrentPosition.Provider>
    </Settings.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
