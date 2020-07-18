import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useJobPosting } from "../lib/hooks";
import Link from "@material-ui/core/Link";
import { CompanyLogoSkeleton } from ".";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    skeleton: {
      transition: `opacity 75ms linear`,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
    },
    img: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 344,
      objectFit: "contain",
      borderRadius: theme.shape.borderRadius,
      transition: `opacity 75ms linear`,
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
    <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
      <div
        className={classes.skeleton}
        style={{ opacity: imageLoaded ? 0 : 1 }}
      >
        <CompanyLogoSkeleton className={classes.center} />
      </div>

      <Link href={jobPosting.company_url} rel="noopener" target="_blank">
        <img
          height="140"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          className={classes.img}
          src={jobPosting.company_logo}
          alt={jobPosting.company}
          onLoad={onImageLoaded}
        />
      </Link>
    </div>
  );
};
