import React from "react";
import { Paragraph } from "./Paragraph";
import { icon } from "../lib/config";
import { useTranslation } from "../lib/translations";

export function CityPicker() {
  const { t } = useTranslation();
  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      // TODO: show dropdown list somehow
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
          className="transition-shadow duration-150 shadow-hairline shadow-hairline-light h-10 sm:h-6 rounded px-4 sm:px-2 appearance-none outline-none focus:shadow-outline"
          name="city"
          id="city"
        />
      </span>

      <button className="transition-shadow duration-150 shadow-hairline shadow-hairline-light block h-10 sm:h-6 button-states button-states-dark relative overflow-hidden bg-primary rounded px-4 sm:px-2 outline-none focus:outline-none focus:shadow-outline">
        <div className="h-10 sm:h-6 overflow-hidden">
          <Paragraph className="sm:transform sm:-translate-y-2 subtitle2 text-white">
            <i>{icon("plus")}</i>
            {` ${t("addCity")}`}
          </Paragraph>
        </div>
      </button>
    </div>
  );
}
