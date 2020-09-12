import React from "react";
import { Paragraph } from "../Paragraph";
import { icon } from "../../lib/config";
import { useContainer } from "unstated-next";
import { CurrentWeather, Settings } from "../..";
import { relativeFormat, formatTemperature } from "../../lib/format";
import icons from "../../lib/openweathermap/icons";
import { useFetchCurrentWeather } from "../../lib/openweathermap/api";
import { GetCurrentResponse } from "OpenWeatherMap";

export function WeatherLocationCard() {
  let { loading, data } = useContainer(CurrentWeather);

  return <WeatherCardBase loading={loading} data={data} />;
}

export function WeatherCityCard({ cityId }: { cityId: number }) {
  let { loading, data } = useFetchCurrentWeather({}, { id: cityId });
  const {
    settings: { cities },
    updateSettings,
  } = useContainer(Settings);
  function deleteHandler() {
    updateSettings({
      cities: cities.filter((id) => id !== cityId),
    });
  }
  return (
    <WeatherCardBase
      loading={loading}
      data={data}
      deletable={true}
      onDelete={deleteHandler}
    />
  );
}

function WeatherCardBase({
  loading,
  data,
  deletable = false,
  onDelete,
}: {
  loading: boolean;
  deletable?: boolean;
  data?: GetCurrentResponse;
  onDelete?: () => void;
}) {
  const { settings, updateSettings } = useContainer(Settings);
  // TODO: loading skeleton
  if (loading || !data) return null;

  const formatParts = formatTemperature(
    data.main.temp,
    settings.locale,
    settings.imperial ? "fahrenheit" : "celsius"
  );
  return (
    <div className="shadow-hairline shadow-hairline-dark app-background-cover relative bg-black bg-opacity-72 text-white p-4 md:p-6 rounded-lg">
      {deletable && (
        <i
          className="exclude absolute right-0 top-0 m-4 md:m-6 z-10 cursor-pointer"
          onClick={onDelete}
        >
          {icon("trash.fill")}
        </i>
      )}
      <Paragraph className="caption text-opacity-72 text-white">
        {relativeFormat(data.dt * 1000, settings.locale)}
      </Paragraph>
      <Paragraph className="headline6">
        {data.name}, {data.sys.country}{" "}
        <i className="px-2">{icon("chevron.right")}</i>
      </Paragraph>
      <div className="flex">
        <i className="text-2xl transform translate-y-8">
          {icon(icons[data.weather[0].icon])}
        </i>
        <div className="px-4 md:px-6">
          <div className="inline-block transform translate-y-2 select-none rounded overflow-hidden button-states button-states-dark relative cursor-pointer">
            <Paragraph
              onClick={() => updateSettings({ imperial: !settings.imperial })}
              className="headline3 transform -translate-y-2"
            >
              {formatParts.map((p, i) =>
                p.unit ? (
                  <span
                    key={i}
                    className="inline-block headline6 transform -translate-y-5"
                  >
                    {p.value}
                  </span>
                ) : (
                  p.value
                )
              )}
            </Paragraph>
          </div>

          <Paragraph className="subtitle1">
            {data.weather[0].description}
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
