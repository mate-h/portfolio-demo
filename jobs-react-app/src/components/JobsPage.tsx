import React, { useEffect, useState } from "react";
import {
  useFetchListPositions,
  useAction,
  useJobPostings,
  useSearchForm,
  usePrevious,
} from "../lib/hooks";
import { JobPosting, JobPostingSkeleton } from ".";
import { merge as mergeAction, pick as pickAction } from "../lib/actions";
import List from "@material-ui/core/List";
import { listPositionsPageCount } from "../lib/config";
import { ListPositionsParams } from "GitHubJobs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export function JobsPage() {
  const { descriptionField, locationField } = useSearchForm();
  let query: ListPositionsParams = {
    description: descriptionField,
    location: locationField,
  };
  const activeQuery = Object.values(query).filter((a) => a).length !== 0;
  const [noResults, setNoResults] = useState(false);
  const [filter, setFilter] = useState(activeQuery);
  const merge = useAction(mergeAction);
  const pick = useAction(pickAction);
  // TODO: handle error state
  const { loading, error } = useFetchListPositions(
    {
      onNewData: (curr, data) => {
        merge({ path: "jobPostings", data, prop: "id" });
        if (activeQuery) {
          pick({ path: "jobPostingsResult", data, prop: "id" });
          setFilter(true);

          if (data.length == 0) setNoResults(true);
          else if (noResults) setNoResults(false);
        } else {
          setFilter(false);
        }
      },
    },
    query
  );

  const jobPostings = useJobPostings({
    filter,
  });

  if (activeQuery && noResults && jobPostings.length === 0) {
    return (
      <Box p={2}>
        <Typography>No results found.</Typography>
      </Box>
    );
  }

  if (jobPostings.length === 0) {
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
