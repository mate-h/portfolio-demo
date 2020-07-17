import React, { useEffect } from "react";
import { useFetchListPositions, useAction, useStore } from "../lib/hooks";
import { JobPosting } from "./JobPosting";
import { merge as mergeAction } from "../lib/actions";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
    },
  })
);

export function JobsPage() {
  const { state } = useStore();
  const merge = useAction(mergeAction);
  const { loading, error } = useFetchListPositions({
    onNewData: (curr, data) => {
      merge({ path: "jobPostings", data, prop: "id" });
      console.log(curr, data.length);
    },
  });

  const classes = useStyles();
  return (
    <>
      <List className={classes.root}>
        {Object.values(state.jobPostings).map((jobPosting) => (
          <JobPosting key={jobPosting.id} id={jobPosting.id} />
        ))}
      </List>
    </>
  );
}
