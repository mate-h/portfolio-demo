import React from "react";
import { Paragraph } from "../Paragraph";
import { icon } from "../../lib/config";

export function WeatherCard() {
  return (
    <div className="app-background-cover relative bg-black bg-opacity-72 text-white p-4 md:p-6 rounded-lg">
      <div className="hairline-border-outside" />
      <Paragraph className="caption text-opacity-72 text-white">
        Monday 5:00 PM
      </Paragraph>
      <Paragraph className="headline6">
        Budapest, Hungary <i className="text-sm">{icon("chevron.right")}</i>
      </Paragraph>
      <div className="flex">
        <i
          style={{
            transform: "translate(0px, 2rem)",
          }}
          className="text-2xl"
        >
          {icon("cloud")}
        </i>
        <div className="px-4 md:px-6">
          <Paragraph className="headline3">
            20
            <span
              style={{
                transform: "translate(0px, -1.25rem)",
              }}
              className="inline-block headline6"
            >
              °C
            </span>
          </Paragraph>
          <Paragraph className="subtitle1">Partly cloudy</Paragraph>
        </div>
      </div>
    </div>
  );
}
