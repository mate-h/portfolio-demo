import React, { useRef, useState } from "react";
import { Paragraph } from "./Paragraph";
import { debounceMaxWait, debounceTime, icon } from "../lib/config";
import { useTranslation } from "../lib/translations";
import { useContainer } from "unstated-next";
import { Settings } from "..";
import { useFetchQueryWeather } from "../lib/openweathermap/api";
import { ErrorResponse, GetCurrentResponse } from "OpenWeatherMap";
import debounce from "lodash.debounce";
import {
  PlacesAutocompleteResponse,
  usePlaceAutocomplete,
} from "../lib/maps-api/api";

export function CityPicker() {
  const { t } = useTranslation();
  const { get, route } = useFetchQueryWeather();
  const [noResults, setNoResults] = useState(false);
  const [visible, setVisible] = useState(false);
  const [autocomplete, setAutocomplete] = useState<
    PlacesAutocompleteResponse
  >();

  const value = useRef<string>();
  const inputRef = useRef(null);
  const {
    settings: { cities },
    updateSettings,
  } = useContainer(Settings);
  const { get: getAutocomplete, route: routePlace } = usePlaceAutocomplete({
    onNewData: (_, newData) => {
      setAutocomplete(newData);
      setVisible(true);
    },
  });
  const fetchAutocomplete = debounce(
    () => {
      getAutocomplete(
        routePlace({
          input: value.current,
        })
      );
    },
    debounceTime,
    { maxWait: debounceMaxWait }
  );
  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      value.current = e.target.value;
      fetchAutocomplete();
    } else {
      setVisible(false);
      setAutocomplete(undefined);
    }
  }
  function clickHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

  function focusHandler(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
    setVisible(true);
  }

  function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
    setVisible(false);
  }

  function selectHandler(
    prediction: PlacesAutocompleteResponse["predictions"][0]
  ) {
    if (inputRef) (inputRef as any).current.value = prediction.description;
    value.current = prediction.description;
    setVisible(false);
    setAutocomplete(undefined);
  }

  const autocompleteOpen =
    visible && autocomplete && autocomplete.predictions.length > 0;
  return (
    <form
      onSubmit={clickHandler}
      className="inline-block sm:flex sm:flex-wrap exclude"
    >
      <label className="cursor-pointer relative z-10" htmlFor="city">
        <Paragraph className="caption text-white">{t("cityName")}</Paragraph>
      </label>

      <span
        className={`${
          autocompleteOpen ? "up" : "button-states button-states-light"
        } dropdown dropdown-right-3 inline-block relative my-2 sm:my-0 mx-0 h-10 sm:h-6 sm:mx-4 md:mx-6`}
      >
        <input
          ref={inputRef}
          onBlur={blurHandler}
          onFocus={focusHandler}
          onChange={handler}
          placeholder="Budapest"
          className={`${
            autocompleteOpen ? "rounded-b-none" : "focus:shadow-outline"
          } truncate pr-10 sm:pr-8 body1 sm:body2 bg-white transition-shadow duration-150 shadow-hairline shadow-hairline-light h-10 sm:h-6 rounded px-4 sm:px-2 appearance-none outline-none`}
          // name="city"
          // id="city"
          // list="cities"
          autoComplete="off"
        />
        {autocompleteOpen && (
          <ul className="py-4 sm:py-2 absolute z-30 mt-10 sm:mt-6 top-0 left-0 right-0 bg-white rounded-b shadow-hairline shadow-hairline-light">
            {autocomplete?.predictions.map((p) => (
              <li
                onClick={() => selectHandler(p)}
                className="h-10 sm:h-auto px-4 sm:px-2 cursor-pointer overflow-hidden relative button-states button-states-light"
                key={p.place_id}
              >
                <Paragraph className="body1 sm:body2 text-black text-opacity-87 truncate transform sm:-translate-y-1">
                  {p.description}
                </Paragraph>
              </li>
            ))}
          </ul>
        )}
        {/* <datalist id="cities">
          {autocomplete?.predictions.map((p: any) => (
            <option key={p.place_id} value={p.description} />
          ))}
        </datalist> */}
      </span>

      <button
        type="submit"
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
    </form>
  );
}
