import React from "react";
import { useJobPosting } from "../lib/hooks";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";

export type JobPostingProps = {
  id: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boldGreen: {
      fontWeight: 500,
      color: theme.palette.success.light,
    },
  })
);

export function JobPosting(props: JobPostingProps) {
  const jobPosting = useJobPosting({ id: props.id });
  const classes = useStyles();
  if (!jobPosting) return <></>;

  const SecondaryText: React.ReactNode = (
    <>
      {jobPosting.company_url ? (
        <>
          <Link color="inherit" href={jobPosting.company_url}>
            {jobPosting.company}
          </Link>
          {jobPosting.type && ` – `}
          <span className={classes.boldGreen}>{jobPosting.type}</span>
        </>
      ) : (
        jobPosting.company
      )}
    </>
  );
  const PrimaryText: React.ReactNode = (
    <Link color="primary" href={jobPosting.url}>
      {jobPosting.title}
    </Link>
  );
  return (
    <ListItem>
      <ListItemText
        primary={PrimaryText}
        secondary={SecondaryText}
        primaryTypographyProps={{ variant: "body2" }}
        secondaryTypographyProps={{ variant: "caption" }}
      />
    </ListItem>
  );
}
