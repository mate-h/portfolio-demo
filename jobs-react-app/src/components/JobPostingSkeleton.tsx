import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Skeleton from "@material-ui/lab/Skeleton";

export function JobPostingSkeleton() {
  return (
    <ListItem>
      <ListItemText
        primary={<Skeleton width={300} height={20} />}
        secondary={<Skeleton width={88} height={19} />}
      />
      <ListItemSecondaryAction>
        <ListItemText
          primary={<Skeleton width={160} height={20} />}
          secondary={
            <Skeleton width={60} height={19} style={{ marginLeft: "auto" }} />
          }
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
