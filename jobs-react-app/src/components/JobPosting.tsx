import React from "react";

export type JobPostingProps = {
  id: string;
};

export function JobPosting(props: JobPostingProps) {
  return <>{props.id}</>;
}
