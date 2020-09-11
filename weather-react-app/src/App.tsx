import React from "react";
import { createContainer } from "unstated-next";
import { Paragraph } from "./components/Paragraph";
import { LocationBanner } from "./components/LocationBanner";
import { useCurrentWeather, usePosition, useSettings } from "./lib/hooks";
import { WeatherCard } from "./components/WeatherCard";
import { icon } from "./lib/config";

export const CurrentWeather = createContainer(useCurrentWeather);

export const CurrentPosition = createContainer(usePosition);

export const Settings = createContainer(useSettings);

function App() {
  const backgroundStyle = {
    "--src": "url(background/weather-bg-1.jpg)",
  };
  const gridComponent =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6";
  return (
    <CurrentPosition.Provider>
      <CurrentWeather.Provider>
        <Settings.Provider>
          <main
            style={backgroundStyle as any}
            className="app-background container mx-auto p-4 md:p-6"
          >
            <LocationBanner />
            <div className="my-4 md:my-6">
              <Paragraph className="headline5 sm:headline4 text-white">
                Simple weather application
              </Paragraph>
            </div>

            <Paragraph bottom={8} className="overline text-white">
              Current location{" "}
              <i
                tabIndex={-1}
                title="Based on your location permission preferences, and your public IP address."
                aria-label="Based on your location permission preferences, and your public IP address."
                className="text-sm cursor-pointer"
              >
                {icon("info.circle")}
              </i>
            </Paragraph>
            <div className={gridComponent}>
              <WeatherCard />
            </div>
            <Paragraph bottom={8} className="overline text-white">
              Your cities
            </Paragraph>
            <div className={gridComponent}>
              <WeatherCard />
              <WeatherCard />
              <WeatherCard />
              <WeatherCard />
              <WeatherCard />
              <WeatherCard />
            </div>
          </main>
        </Settings.Provider>
      </CurrentWeather.Provider>
    </CurrentPosition.Provider>
  );
}

export default App;
