import React from "react";
import Interweave from "interweave";
import { useParams } from "react-router-dom";
import { BackNavigation, CompanyLogo } from ".";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useJobPosting, useFetchJobPosting, useAction } from "../lib/hooks";
import { set as setAction } from "../lib/actions";

export function JobDetailPage() {
  const { id } = useParams();
  const set = useAction(setAction);
  // TODO: handle error state
  const { loading, error } = useFetchJobPosting(
    {
      onNewData: (curr, data) => {
        set({ path: `jobPostingsDetail.${id}`, data });
      },
    },
    { id }
  );
  const jobPosting = useJobPosting({ id });

  if (!jobPosting) return <></>;

  return (
    <Box p={2}>
      <div>
        <BackNavigation fallback="/" />
      </div>
      {jobPosting.company_logo && <CompanyLogo id={id} />}
      <div>
        <Typography color="textSecondary" variant="overline">
          {jobPosting.type}
          {jobPosting.type && ` / `}
          {jobPosting.location}
        </Typography>
        <Typography variant="h6">{jobPosting.title}</Typography>
      </div>
      <Interweave content={jobPosting.description} />
    </Box>
  );
}
