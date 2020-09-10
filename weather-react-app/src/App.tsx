import React from "react";
import { createContainer } from "unstated-next";
import { Paragraph } from "./components/Paragraph";
import { LocationBanner } from "./components/LocationBanner";
import { useCurrentWeather, usePosition } from "./lib/hooks";
import { WeatherCard } from "./components/WeatherCard";

export const CurrentWeather = createContainer(useCurrentWeather);

export const CurrentPosition = createContainer(usePosition);

function App() {
  const backgroundStyle = {
    "--src": "url(background/weather-bg-1.jpg)",
  };
  return (
    <CurrentPosition.Provider>
      <CurrentWeather.Provider>
        <main
          style={backgroundStyle as any}
          className="app-background container mx-auto p-4 md:p-6"
        >
          <LocationBanner />
          <Paragraph className="headline6 text-white">
            Simple weather application
          </Paragraph>
          <div className="my-4 md:my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
            <WeatherCard />
          </div>
        </main>
      </CurrentWeather.Provider>
    </CurrentPosition.Provider>
  );
}

export default App;
