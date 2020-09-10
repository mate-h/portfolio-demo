import { useState, useEffect } from "react";

export function usePersistedState(key: string, defaultValue: any) {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }

    return defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
