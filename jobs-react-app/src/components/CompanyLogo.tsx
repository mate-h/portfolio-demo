import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useJobPosting } from "../lib/hooks";
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    img: {
      maxWidth: 344,
      objectFit: "contain",
      borderRadius: theme.shape.borderRadius,
    },
  })
);

export type CompanyLogoParams = {
  id: string;
};

export const CompanyLogo = (params: CompanyLogoParams) => {
  const jobPosting = useJobPosting({ id: params.id });
  const classes = useStyles();
  const [imageLoaded, setImageLoaded] = useState(false);
  const onImageLoaded = () => {
    setImageLoaded(true);
  };
  return (
    <div style={{ height: 140, overflow: "hidden" }}>
      <Skeleton
        className={classes.center}
        style={{ display: imageLoaded ? "none" : "visible" }}
        height={140}
        width={344}
      />
      <Link href={jobPosting.company_url} rel="noopener" target="_blank">
        <img
          height="140"
          className={[classes.img, classes.center].join(" ")}
          src={jobPosting.company_logo}
          alt={jobPosting.company}
          onLoad={onImageLoaded}
        />
      </Link>
    </div>
  );
};
