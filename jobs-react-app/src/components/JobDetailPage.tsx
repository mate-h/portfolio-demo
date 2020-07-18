import React from "react";
import Interweave from "interweave";
import { useParams } from "react-router-dom";
import { BackNavigation, CompanyLogo, JobDetailSkeleton } from ".";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useJobPosting, useFetchJobPosting, useAction } from "../lib/hooks";
import { set as setAction } from "../lib/actions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

export function JobDetailPage() {
  const { id } = useParams();
  const set = useAction(setAction);
  // TODO: handle error state
  const { loading } = useFetchJobPosting(
    {
      onNewData: (curr, data) => {
        set({ path: `jobPostingsDetail.${id}`, data });
      },
    },
    { id }
  );
  const jobPosting = useJobPosting({ id });

  if (loading && !jobPosting) return <JobDetailSkeleton />;

  // extract apply link from "how to apply" section
  const el = document.createElement("html");
  el.innerHTML = jobPosting.how_to_apply;
  const anchors = el.getElementsByTagName("a");
  let applyLink;
  if (anchors.length) {
    applyLink = anchors.item(0)?.href;
  }

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
      <Box py={2}>
        <Divider />
      </Box>
      <Typography variant="h6">How to apply</Typography>
      <Interweave content={jobPosting.how_to_apply} />

      {applyLink && (
        <div>
          <Button
            rel="noopener"
            target="_blank"
            href={applyLink}
            variant="contained"
            color="primary"
          >
            Apply now
          </Button>
        </div>
      )}
    </Box>
  );
}
