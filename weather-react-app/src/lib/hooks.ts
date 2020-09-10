import { useState, useEffect } from "react";

export function usePersistedState<T>(key: string, defaultValue?: any) {
  const [state, setState] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }

    return defaultValue;
  });
  useEffect(() => {
    if (state !== undefined) localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  function resetState(overrideDefault?: any) {
    if (overrideDefault !== undefined) {
      setState(overrideDefault);
      localStorage.setItem(key, JSON.stringify(overrideDefault));
    } else if (defaultValue) {
      setState(defaultValue);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    } else {
      setState(undefined as any);
      localStorage.removeItem(key);
    }
  }
  return [state, setState, resetState];
}
