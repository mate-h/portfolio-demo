import { Action, useStore } from "./store";

export const getType = (
  actionCreator: (params: any) => Action<any>
): string => {
  return actionCreator(null).type;
};

export function useAction<T>(actionCreator: (payload: T) => any) {
  const { dispatch } = useStore();
  return (payload: T) => dispatch(actionCreator(payload) as any);
}

const r = "actions";

export const set = (params: {
  path: string | string[];
  data: any;
}): Action<any> => ({
  type: `${r}/set`,
  payload: params,
});

export const merge = (params: {
  path: string | string[];
  data: any[];
  prop: string;
}): Action<any> => ({
  type: `${r}/merge`,
  payload: params,
});

export const pick = (params: {
  path: string | string[];
  data: any[];
  prop: string;
}): Action<any> => ({
  type: `${r}/pick`,
  payload: params,
});
