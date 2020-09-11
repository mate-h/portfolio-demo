import React from "react";
import { Paragraph } from "./components/Paragraph";
import { LocationBanner } from "./components/LocationBanner";
import { WeatherCard } from "./components/WeatherCard";
import { icon } from "./lib/config";
import { LanguagePicker } from "./components/LanguagePicker";
import { CityPicker } from "./components/CityPicker";
import { useTranslation } from "./lib/translations";

function App() {
  const backgroundStyle = {
    "--src": "url(background/weather-bg-1.jpg)",
  };
  const gridComponent =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6";
  const { t } = useTranslation();
  return (
    <main
      style={backgroundStyle as any}
      className="app-background container mx-auto px-4 md:px-6"
    >
      <LocationBanner />
      <LanguagePicker className="my-4 md:my-6" />
      <Paragraph
        top={-4}
        bottom={4}
        className="headline5 sm:headline4 text-white"
      >
        {t("title")}
      </Paragraph>

      <div className="my-4 md:my-6">
        <Paragraph bottom={8} className="overline text-white">
          {`${t("location")} `}
          <i
            tabIndex={-1}
            title={t("location.description")}
            aria-label={t("location.description")}
            className="text-sm cursor-pointer"
          >
            {icon("info.circle")}
          </i>
        </Paragraph>
        <div className={gridComponent}>
          <WeatherCard />
        </div>
      </div>
      <CityPicker />
      <div className="my-4 md:my-6">
        <Paragraph bottom={8} className="overline text-white">
          {t("yourCities")}
        </Paragraph>

        <div className={gridComponent}>
          <WeatherCard />
        </div>
      </div>
    </main>
  );
}

export default App;
