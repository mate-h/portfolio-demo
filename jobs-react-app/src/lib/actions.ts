import { Action } from "./store";

export const getType = (
  actionCreator: (params: any) => Action<any>
): string => {
  return actionCreator(null).type;
};

const r = "actions";

export const set = (params: {
  path: string | string[];
  data: any;
}): Action<any> => ({
  type: `${r}/set`,
  payload: params,
});
