import React from "react";
import { useJobPosting } from "../lib/hooks";

export type JobPostingProps = {
  id: string;
};

export function JobPosting(props: JobPostingProps) {
  const jobPosting = useJobPosting({ id: props.id });
  if (!jobPosting) return <></>;

  return <div>{jobPosting.title}</div>;
}
