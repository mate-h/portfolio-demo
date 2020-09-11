import React from "react";
import { Paragraph } from "./Paragraph";
import { icon } from "../lib/config";

const decoder = new TextDecoder();

export function CityPicker() {
  function handler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      // TODO: show dropdown list somehow
    }
  }

  return (
    <div className="inline-block sm:flex sm:flex-wrap">
      <label className="cursor-pointer" htmlFor="city">
        <Paragraph className="caption text-white">Enter a city name</Paragraph>
      </label>

      <input
        onFocus={(e) => e.target.select()}
        onChange={handler}
        placeholder="Budapest, HU"
        className="my-2 sm:my-0 mx-0 sm:mx-4 md:mx-6 h-10 sm:h-6 rounded px-4 sm:px-2 appearance-none outline-none focus:shadow-outline"
        name="city"
        id="city"
      />

      <button className="block h-10 sm:h-6 button-states-dark relative overflow-hidden bg-primary rounded px-4 sm:px-2 outline-none focus:outline-none focus:shadow-outline">
        <div className="h-10 sm:h-6 overflow-hidden">
          <Paragraph className="sm:transform sm:-translate-y-2 subtitle2 text-white">
            <i>{icon("plus")}</i>
            Add city
          </Paragraph>
        </div>
      </button>
    </div>
  );
}
