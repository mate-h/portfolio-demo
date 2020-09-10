import React from "react";
import { Paragraph } from "../Paragraph";
import { icon } from "../../lib/config";
import { useContainer } from "unstated-next";
import { CurrentWeather } from "../../App";
import { relativeFormat, formatCelsius } from "../../lib/format";

export function WeatherCard({ city }: { city?: string }) {
  const { loading, data } = useContainer(CurrentWeather);
  if (loading || !data) return null;
  const formatParts = formatCelsius(data.main.temp);
  console.log(data);
  return (
    <div className="app-background-cover relative bg-black bg-opacity-72 text-white p-4 md:p-6 rounded-lg">
      <div className="hairline-border-outside" />
      <Paragraph className="caption text-opacity-72 text-white">
        {relativeFormat(data.dt * 1000)}
      </Paragraph>
      <Paragraph className="headline6">
        {data.name}, {data.sys.country}{" "}
        <i className="px-2">{icon("chevron.right")}</i>
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
            {formatParts.map((p) =>
              p.unit ? (
                <span
                  style={{
                    transform: "translate(0px, -1.25rem)",
                  }}
                  className="inline-block headline6"
                >
                  {p.value}
                </span>
              ) : (
                p.value
              )
            )}
          </Paragraph>
          <Paragraph className="subtitle1">
            {data.weather[0].description}
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
