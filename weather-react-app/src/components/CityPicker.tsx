import React, { useRef, useState } from "react";
import { Paragraph } from "./Paragraph";
import { icon } from "../lib/config";
import { useTranslation } from "../lib/translations";
import { useContainer } from "unstated-next";
import { Settings } from "..";
import { useFetchQueryWeather } from "../lib/openweathermap/api";
import { ErrorResponse, GetCurrentResponse } from "OpenWeatherMap";

export function CityPicker() {
  const { t } = useTranslation();
  const { get, route } = useFetchQueryWeather();
  const [noResults, setNoResults] = useState(false);
  const value = useRef<string>();
  const {
    settings: { cities },
    updateSettings,
  } = useContainer(Settings);
  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      // TODO: show dropdown list somehow
      value.current = e.target.value;
    }
  }
  function clickHandler() {
    if (value.current) {
      get(route({ q: value.current })).then(
        (value: GetCurrentResponse | ErrorResponse) => {
          if (value.cod !== 200) {
            //error
            setNoResults(true);
          } else {
            setNoResults(false);
            const id = (value as GetCurrentResponse).id;
            if (!cities.includes(id)) {
              updateSettings({
                cities: [id, ...cities],
              });
            }
          }
        }
      );
    }
  }

  return (
    <div className="inline-block sm:flex sm:flex-wrap">
      <label className="cursor-pointer" htmlFor="city">
        <Paragraph className="caption text-white">{t("cityName")}</Paragraph>
      </label>

      <span className="inline-block relative button-states button-states-light my-2 sm:my-0 mx-0 sm:mx-4 md:mx-6">
        <input
          onFocus={(e) => e.target.select()}
          onChange={handler}
          placeholder="Budapest, HU"
          className="bg-white transition-shadow duration-150 shadow-hairline shadow-hairline-light h-10 sm:h-6 rounded px-4 sm:px-2 appearance-none outline-none focus:shadow-outline"
          name="city"
          id="city"
        />
      </span>

      <button
        onClick={clickHandler}
        className="transition-shadow duration-150 shadow-hairline shadow-hairline-light block h-10 sm:h-6 button-states button-states-dark relative overflow-hidden bg-primary rounded px-4 sm:px-2 outline-none focus:outline-none focus:shadow-outline"
      >
        <div className="h-10 sm:h-6 overflow-hidden">
          <Paragraph className="sm:transform sm:-translate-y-2 subtitle2 text-white">
            <i>{icon("plus")}</i>
            {` ${t("addCity")}`}
          </Paragraph>
        </div>
      </button>
      {noResults && (
        <Paragraph className="sm:px-4 md:px-6 body2 text-white transform -translate-y-1">
          No results
        </Paragraph>
      )}
    </div>
  );
}
