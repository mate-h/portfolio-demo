import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { JobsPage, JobDetailPage } from "./components/pages";
import { Layout } from "./components";

export default function App() {
  return (
    <Router>
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
