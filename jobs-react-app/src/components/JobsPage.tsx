import React from "react";
import { useFetchListPositions, useAction, useJobPostings } from "../lib/hooks";
import { JobPosting, JobPostingSkeleton } from ".";
import { merge as mergeAction } from "../lib/actions";
import List from "@material-ui/core/List";
import { listPositionsPageCount } from "../lib/config";

export function JobsPage() {
  const jobPostings = useJobPostings();
  const merge = useAction(mergeAction);
  // TODO: handle error state
  const { loading, error } = useFetchListPositions({
    onNewData: (curr, data) => {
      merge({ path: "jobPostings", data, prop: "id" });
    },
  });
  const shouldRenderSkeleton = () => loading && jobPostings.length === 0;

  if (shouldRenderSkeleton()) {
    return (
      <List>
        {[...new Array(listPositionsPageCount)].map((_, i) => (
          <JobPostingSkeleton key={i} />
        ))}
      </List>
    );
  }

  return (
    <>
      <List>
        {jobPostings.map((jobPosting) => (
          <JobPosting key={jobPosting.id} id={jobPosting.id} />
        ))}
      </List>
    </>
  );
}
