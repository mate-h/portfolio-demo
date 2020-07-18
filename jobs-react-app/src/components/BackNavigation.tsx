import React from "react";
import { BackIcon } from ".";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

export type BackNavigationProps = {
  /** A direct link to the master page in case the detail page was not navigated from the master page */
  fallback: string;
};

export const BackNavigation: React.FC<BackNavigationProps> = (
  props: BackNavigationProps
) => {
  const history = useHistory();
  const location = useLocation();
  let BackLink: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <Link color="primary" component={RouterLink} to={props.fallback}>
      {children}
    </Link>
  );
  if (location.state && (location.state as any).from) {
    // Newer browsers preserve scroll position on back navigation
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
};
