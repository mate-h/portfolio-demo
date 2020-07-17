import { useParams } from "react-router-dom";

import React from "react";
import { BackNavigation } from "./BackNavigation";
import { Typography } from "@material-ui/core";
import { useJobPosting, useFetchJobPosting, useAction } from "../lib/hooks";
import { set as setAction } from "../lib/actions";

export function JobDetailPage() {
  const { id } = useParams();
  const set = useAction(setAction);
  const { loading, error } = useFetchJobPosting(
    {
      onNewData: (curr, data) => {
        set({ path: `jobPostings.${id}`, data });
      },
    },
    { id }
  );
  const jobPosting = useJobPosting({ id });
  if (!jobPosting) return <></>;

  return (
    <div style={{ padding: 16 }}>
      <div>
        <BackNavigation />
      </div>
      <Typography color="textSecondary" variant="overline">
        {jobPosting.type}
        {jobPosting.type && ` / `}
        {jobPosting.location}
      </Typography>
      <Typography variant="h6">{jobPosting.title}</Typography>
      Job detail page<code>{id}</code>
    </div>
  );
}
