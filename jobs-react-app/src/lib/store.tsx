import React, { useReducer, Dispatch, useContext } from "react";
import { getType, set, merge } from "./actions";
import * as icepick from "icepick";
import { JobPosting } from "GitHubJobs";

export interface Action<T> {
  type: string;
  payload: T;
}

type JobPostingsState = { [id: string]: JobPosting };
type JobPostingsDetailState = { [id: string]: JobPosting };

export interface StoreState {
  jobPostings: JobPostingsState;
  jobPostingsDetail: JobPostingsDetailState;
  searchForm: {
    descriptionField: string;
    locationField: string;
  };
}

const initialState: StoreState = icepick.freeze({
  jobPostings: {},
  jobPostingsDetail: {},
  searchForm: {
    descriptionField: "",
    locationField: "",
  },
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
  let path;
  switch (type) {
    case getType(set):
      path = makepath(payload.path);
      return icepick.assocIn(state, path, payload.data);
    case getType(merge):
      path = makepath(payload.path);
      const prop = payload.prop;
      const newData = payload.data.reduce((acc: any, curr: any) => {
        return { [curr[prop]]: curr, ...acc };
      }, {});
      return icepick.assocIn(
        state,
        path,
        icepick.merge(newData, icepick.getIn(state, path))
      );
  }
  return state;
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  // Uncomment this line to inspect store state
  // console.log("store state", state);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export function useStore() {
  return useContext(Store);
}
