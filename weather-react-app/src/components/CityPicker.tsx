import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { debounceMaxWait, debounceTime, icon } from '../lib/config';
import { useTranslation } from '../lib/translations';
import { useContainer, Settings } from './containers';
import { useFetchQueryWeather } from '../lib/openweathermap/api';
import type { ErrorResponse, GetCurrentResponse } from 'OpenWeatherMap';
import debounce from 'lodash.debounce';
import {
  PlacesAutocompleteResponse,
  usePlaceAutocomplete,
} from '../lib/maps-api/api';

export function CityPicker() {
  const { t } = useTranslation();
  const { get, route } = useFetchQueryWeather();
  const [noResults, setNoResults] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hold, setHold] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [autocomplete, setAutocomplete] = useState<
    PlacesAutocompleteResponse | undefined
  >(undefined);

  const value = useRef<string>();
  const inputRef = useRef<HTMLInputElement>();
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
        }),
      );
    },
    debounceTime,
    { maxWait: debounceMaxWait },
  );
  const handler: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    if ((e.target as HTMLInputElement).value !== '') {
      value.current = (e.target as HTMLInputElement).value;
      fetchAutocomplete();
      setEmpty(false);
    } else {
      setEmpty(true);
      setVisible(false);
      setAutocomplete(undefined);
    }
  };
  const submitHandler: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
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
        },
      );
    }
  };

  const focusHandler: h.JSX.FocusEventHandler<HTMLInputElement> = (e) => {
    // (e.target as HTMLInputElement).select();
    setVisible(true);
  };

  function blurHandler() {
    if (!hold) setVisible(false);
  }

  function holdCancelHandler() {
    setHold(false);
    setVisible(false);
    if (!!window.PointerEvent)
      window.removeEventListener('pointerup', holdCancelHandler);
    else {
      window.removeEventListener('mouseup', holdCancelHandler);
      window.removeEventListener('touchend', holdCancelHandler);
    }
  }

  function holdHandler() {
    setHold(true);
    if (!!window.PointerEvent)
      window.addEventListener('pointerup', holdCancelHandler);
    else {
      window.addEventListener('mouseup', holdCancelHandler);
      window.addEventListener('touchend', holdCancelHandler);
    }
  }

  function selectHandler(
    prediction: PlacesAutocompleteResponse['predictions'][0],
  ) {
    inputRef.current.value = prediction.description;
    value.current = prediction.description;
    setHold(false);
    setVisible(false);
    setAutocomplete(undefined);
  }

  function clearHandler() {
    inputRef.current.value = '';
    setEmpty(true);
    inputRef.current.focus();
    setVisible(false);
    setAutocomplete(undefined);
  }

  const autocompleteOpen =
    visible && autocomplete && autocomplete.predictions.length > 0;
  return (
    <form
      onSubmit={submitHandler}
      class="inline-block sm:flex sm:flex-wrap exclude"
    >
      <label class="cursor-pointer relative z-10" htmlFor="city">
        <p class="caption text-white">{t('cityName')}</p>
      </label>

      <span
        class={`${
          autocompleteOpen ? '' : 'button-states button-states-light'
        } inline-block relative my-2 sm:my-0 mx-0 h-10 sm:h-6 sm:mx-4 md:mx-6`}
      >
        <input
          type="search"
          ref={inputRef}
          onBlur={blurHandler}
          onFocus={focusHandler}
          onChange={handler}
          placeholder="Budapest"
          class={`${
            autocompleteOpen ? 'rounded-b-none' : 'focus:shadow-outline'
          } truncate pr-10 sm:pr-8 body1 sm:body2 bg-white transition-shadow duration-150 shadow-hairline shadow-hairline-light h-10 sm:h-6 rounded px-4 sm:px-2 appearance-none outline-none`}
          autoComplete="off"
        />
        <i
          onClick={clearHandler}
          class={`${
            empty
              ? ''
              : 'cursor-pointer pointer-events-auto button-states button-states-light'
          } pointer-events-none absolute right-0 text-xs inset-y-0 flex items-center justify-center w-10 sm:w-8 text-black text-opacity-54`}
        >
          {empty
            ? autocompleteOpen
              ? icon('chevron.up')
              : icon('chevron.down')
            : icon('xmark')}
        </i>
        {autocompleteOpen && (
          <ul
            onPointerDown={holdHandler}
            onMouseDown={!window.PointerEvent ? holdHandler : () => {}}
            onTouchStart={!window.PointerEvent ? holdHandler : () => {}}
            class="py-4 sm:py-2 absolute z-30 mt-10 sm:mt-6 top-0 left-0 right-0 bg-white rounded-b shadow-hairline shadow-hairline-light"
          >
            {autocomplete?.predictions.map((p) => (
              <li
                onPointerUp={() => selectHandler(p)}
                onMouseUp={
                  !window.PointerEvent ? () => selectHandler(p) : () => {}
                }
                onTouchEnd={
                  !window.PointerEvent ? () => selectHandler(p) : () => {}
                }
                class="h-10 sm:h-auto px-4 sm:px-2 cursor-pointer overflow-hidden relative button-states button-states-light"
                key={p.place_id}
              >
                <p class="body1 sm:body2 text-black text-opacity-87 truncate transform sm:-translate-y-1">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </span>

      <button
        type="submit"
        class="transition-shadow duration-150 shadow-hairline shadow-hairline-light block h-10 sm:h-6 button-states button-states-dark relative overflow-hidden bg-primary rounded px-4 sm:px-2 outline-none focus:outline-none focus:shadow-outline"
      >
        <div class="h-10 sm:h-6 overflow-hidden">
          <p class="sm:transform sm:-translate-y-2 subtitle2 text-white">
            <i>{icon('plus')}</i>
            {` ${t('addCity')}`}
          </p>
        </div>
      </button>
      {noResults && (
        <p class="sm:px-4 md:px-6 body2 text-white transform -translate-y-1">
          {t('noResults')}
        </p>
      )}
    </form>
  );
}
