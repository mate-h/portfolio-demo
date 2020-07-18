import { API, ListPositionsResponse, JobPosting } from "GitHubJobs";
import useFetch, { UseFetch, IncomingOptions } from "use-http";
import { listPositionsRequestUrl, getPositionsRequestUrl } from "../config";

type StatefulHook<T extends (...args: any) => any> = (
  options?: IncomingOptions,
  ...params: Parameters<T>
) => UseFetch<ReturnType<T>>;

// expiration is 24 hours by default
const fetchOptions: IncomingOptions = {
  persist: true,
};

export const useFetchListPositions: StatefulHook<API["listPositions"]> = (
  options,
  params
) => {
  const url = new URL(listPositionsRequestUrl);
  url.search = new URLSearchParams(params as any).toString();
  return useFetch<ListPositionsResponse>(
    url.toString(),
    { ...fetchOptions, ...options },
    []
  );
};

export const useFetchJobPosting: StatefulHook<API["getJobPosting"]> = (
  options,
  params
) => {
  if (!params) throw Error("ID parameter must be defined");
  const id = params.id;
  const url = new URL(getPositionsRequestUrl(id));
  delete params["id"];
  url.search = new URLSearchParams(params as any).toString();
  return useFetch<JobPosting>(
    url.toString(),
    { ...fetchOptions, ...options },
    []
  );
};
