// GitHub Jobs API config
export const apiRoot = process.env.REACT_APP_API_ROOT;
export const listPositionsRequestUrl = `${apiRoot}/positions.json`;
export const getPositionsRequestUrl = (id: string) =>
  `${apiRoot}/positions/${id}.json`;
export const listPositionsPageCount = 50;

// Other config
export const debounceTime = 150; //ms
