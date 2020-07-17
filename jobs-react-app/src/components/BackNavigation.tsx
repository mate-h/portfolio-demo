import React from "react";
import BackIcon from "./BackIcon";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

export function BackNavigation(props: any) {
  const history = useHistory();
  const location = useLocation();
  let BackLink: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <Link color="primary" component={RouterLink} to="/">
      {children}
    </Link>
  );
  if (location.state) {
    // For preserving scroll position in new browsers
    BackLink = ({ children }) => (
      <Link color="primary" onClick={history.goBack} href="#">
        {children}
      </Link>
    );
  }

  return (
    <BackLink>
      <BackIcon style={{ fill: "currentColor", height: 12 }} />
      <Typography
        color="inherit"
        style={{ verticalAlign: 1, marginLeft: 4 }}
        variant="caption"
      >
        Back
      </Typography>
    </BackLink>
  );
}
