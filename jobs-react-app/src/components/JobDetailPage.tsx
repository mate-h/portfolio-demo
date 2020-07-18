import React from "react";
import Interweave from "interweave";
import { useParams } from "react-router-dom";
import { BackNavigation, CompanyLogo } from ".";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useJobPosting, useFetchJobPosting, useAction } from "../lib/hooks";
import { set as setAction } from "../lib/actions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { attributeRegex } from "../lib/config";

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

  // extract apply link from "how to apply" section
  const match = jobPosting.how_to_apply.match(attributeRegex);
  let applyLink;
  if (match) {
    applyLink = match.reduce((acc, curr, i, arr) => {
      if (curr == "href") {
        return arr[i + 1];
      }
      return acc;
    });
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
