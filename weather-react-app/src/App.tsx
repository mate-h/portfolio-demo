import React from "react";
import { Paragraph } from "./components/Paragraph";
import { LocationBanner } from "./components/LocationBanner";
import { WeatherCityCard, WeatherLocationCard } from "./components/WeatherCard";
import { icon } from "./lib/config";
import { LanguagePicker } from "./components/LanguagePicker";
import { CityPicker } from "./components/CityPicker";
import { useTranslation } from "./lib/translations";
import { useContainer } from "unstated-next";
import { Settings } from ".";

function App() {
  const backgroundStyle = {
    "--src": "url(background/weather-bg-1.jpg)",
  };
  const gridComponent =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6";
  const { t } = useTranslation();
  const {
    settings: { cities },
  } = useContainer(Settings);
  return (
    <main
      style={backgroundStyle as any}
      className="relative app-background container mx-auto px-4 md:px-6"
    >
      <div className="baseliner" />
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
          <WeatherLocationCard />
        </div>
      </div>
      <CityPicker />
      <div className="my-4 md:my-6">
        <Paragraph bottom={8} className="overline text-white">
          {t("yourCities")}
        </Paragraph>

        <div className={gridComponent}>
          {cities.map((id) => (
            <WeatherCityCard key={id} cityId={id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
