import React, { useReducer, Dispatch, useContext } from "react";
import { getType, set } from "./actions";
import * as icepick from "icepick";
import { ListPositionsResponse } from "GitHubJobs";

export interface Action<T> {
  type: string;
  payload: T;
}

export interface StoreState {
  jobPostings: ListPositionsResponse;
}

const initialState: StoreState = icepick.freeze({
  jobPostings: [],
});

export interface Store {
  state: StoreState;
  dispatch: Dispatch<Action<any>>;
}

export const Store = React.createContext<Store>({
  state: initialState,
  dispatch: () => {},
});

const makepath = (path: string | string[]) =>
  path instanceof Array
    ? path
        .map((p: string) => p.split("."))
        .reduce((acc, curr) => [...acc, ...curr])
    : path.split(".");

function reducer(state: StoreState, action: Action<any>): StoreState {
  const { type, payload } = action;
  switch (type) {
    case getType(set):
      let path = makepath(payload.path);
      return icepick.assocIn(state, path, payload.data);
  }
  return state;
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log("State", state);
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export function useStore() {
  return useContext(Store);
}
