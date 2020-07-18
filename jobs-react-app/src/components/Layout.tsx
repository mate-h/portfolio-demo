import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { SearchBar, ProTip } from ".";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
    },
  })
);

function Copyright() {
  return (
    <Box py={2}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"© "}
        {new Date().getFullYear() + " "}
        <Link color="inherit" href="https://jobs.github.com/">
          GitHub Inc.
        </Link>
        {" All rights reserved."}
      </Typography>
    </Box>
  );
}

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          GitHub Jobs
        </Typography>
        <ProTip />
        <SearchBar />
        <div className={classes.root}>{children}</div>
        <Copyright />
      </Box>
    </Container>
  );
};
