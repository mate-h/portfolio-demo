export const apiRoot = process.env.REACT_APP_API_ROOT;
export const listPositionsRequestUrl = `${apiRoot}/positions.json`;
export const getPositionsRequestUrl = (id: string) =>
  `${apiRoot}/positions/${id}.json`;
