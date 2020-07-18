import { useStore } from "./hooks";
import { JobPosting } from "GitHubJobs";

export type JobPostingSelectorParams = {
  id: string;
};

export type SortJobPostings = (a: JobPosting, b: JobPosting) => number;
export type JobPostingsSelectorParams = Partial<{
  sort: SortJobPostings;
}>;

const defaultSort: SortJobPostings = (a, b) => {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

export function useJobPostings(params?: JobPostingsSelectorParams) {
  // set defaults
  const mergedParams: JobPostingsSelectorParams = {
    sort: defaultSort,
    ...params,
  };
  const { state } = useStore();
  return Object.values(state.jobPostings).sort(mergedParams.sort);
}

// Note: JobPosting type and JobPostingDetail type are equivalent in case of this API
export function useJobPosting(params: JobPostingSelectorParams): JobPosting {
  const { state } = useStore();
  // return full data
  if (state.jobPostingsDetail[params.id])
    return state.jobPostingsDetail[params.id];
  // return partial data
  return state.jobPostings[params.id];
}
