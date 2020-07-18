import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { JobsPage, JobDetailPage } from "./components/pages";
import { Layout } from "./components";

function ScrollBehavior() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // reset scroll on forward navigation
    if (state && (state as any).from) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollBehavior />
      <Switch>
        <Route path="/job/:id">
          <Layout>
            <JobDetailPage />
          </Layout>
        </Route>
        <Route path="/">
          <Layout>
            <JobsPage />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}
