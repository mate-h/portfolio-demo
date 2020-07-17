import { API, ListPositionsResponse } from "GitHubJobs";
import useFetch, { UseFetch, IncomingOptions } from "use-http";
import { listPositionsRequestUrl, getPositionsRequestUrl } from "./config";

type StatefulHook<T extends (...args: any) => any> = (
  ...params: Parameters<T>
) => UseFetch<ReturnType<T>>;

// expiration is 24 hours by default
const fetchOptions: IncomingOptions = {
  persist: true,
};

export const useListPositions: StatefulHook<API["listPositions"]> = (
  params
) => {
  const url = new URL(listPositionsRequestUrl);
  url.search = new URLSearchParams(params as any).toString();
  return useFetch<ListPositionsResponse>(url.toString(), fetchOptions, []);
};
