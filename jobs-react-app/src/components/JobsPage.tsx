import React from "react";
import { useFetchListPositions, useAction, useJobPostings } from "../lib/hooks";
import { JobPosting } from "./JobPosting";
import { merge as mergeAction } from "../lib/actions";
import List from "@material-ui/core/List";

export function JobsPage() {
  const jobPostings = useJobPostings();
  const merge = useAction(mergeAction);
  const { loading, error } = useFetchListPositions({
    onNewData: (curr, data) => {
      merge({ path: "jobPostings", data, prop: "id" });
    },
  });

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
