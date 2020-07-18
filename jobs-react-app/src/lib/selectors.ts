import { useStore } from "./hooks";
import { JobPosting } from "GitHubJobs";

export type JobPostingSelectorParams = {
  id: string;
};

export type SortJobPostrings = (a: JobPosting, b: JobPosting) => number;
export type JobPostingsSelectorParams = Partial<{
  sort: SortJobPostrings;
}>;

const defaultSort: SortJobPostrings = (a, b) => {
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

export function useJobPosting(params: JobPostingSelectorParams): JobPosting {
  const { state } = useStore();
  return state.jobPostings[params.id];
}
