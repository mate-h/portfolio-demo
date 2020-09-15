import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createContainer } from "unstated-next";
import { useLocationWeather, usePosition, useSettings } from "./lib/hooks";

export const CurrentWeather = createContainer(useLocationWeather);

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

// Force refresh favicon when system color scheme changes
function listener(e: MediaQueryListEvent) {
  const link: HTMLLinkElement | null = document.querySelector(
    "link[rel*='icon']"
  );
  if (link) {
    const darkModeOn = e.matches;
    link.href = "icon.svg" + (darkModeOn ? "?mode=dark" : "");
  }
}
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
try {
  darkModeMediaQuery.addListener(listener);
  darkModeMediaQuery.addEventListener("change", listener);
} catch (e) {}
