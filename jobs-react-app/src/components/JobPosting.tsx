import React from "react";
import { useJobPosting } from "../lib/hooks";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Link as RouterLink, useLocation } from "react-router-dom";

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
  const location = useLocation();
  if (!jobPosting) return <></>;

  const dateFormat = (date: string) =>
    new Intl.DateTimeFormat(navigator.language).format(new Date(date));
  const relativeFormat = (d: string) => {
    try {
      const diff = new Date().getTime() - new Date(d).getTime();
      const days = diff / (1000 * 3600 * 24);
      const rtf = new (Intl as any).RelativeTimeFormat(navigator.language);
      if (days > 31) {
        const months = diff / (1000 * 3600 * 24 * 30.42);
        return rtf.format(Math.ceil(-months), "month");
      }
      if (days > 1) {
        return rtf.format(Math.ceil(-days), "day");
      }
      const hours = diff / (1000 * 3600);
      return rtf.format(Math.ceil(-hours), "hour");
    } catch (e) {
      return dateFormat(d);
    }
  };
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
    <Link
      component={RouterLink}
      to={{
        pathname: `/job/${jobPosting.id}`,
        state: { from: location.pathname },
      }}
      color="primary"
    >
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
      <ListItemSecondaryAction>
        <ListItemText
          primary={jobPosting.location}
          secondary={relativeFormat(jobPosting.created_at)}
          primaryTypographyProps={{ variant: "body2", align: "right" }}
          secondaryTypographyProps={{ variant: "caption", align: "right" }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
