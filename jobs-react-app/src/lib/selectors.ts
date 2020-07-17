import { useStore } from "./hooks";
import { JobPosting } from "GitHubJobs";

export type JobPostingSelectorParams = {
  id: string;
};

export function useJobPosting(params: JobPostingSelectorParams): JobPosting {
  const { state } = useStore();
  return state.jobPostings[params.id];
}
