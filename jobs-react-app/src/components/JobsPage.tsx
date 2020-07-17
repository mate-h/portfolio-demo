import React from "react";
import { useListPositions } from "../lib/hooks";
import { JobPosting } from "./JobPosting";

export function JobsPage() {
  const { loading, error, data = [] } = useListPositions();

  return (
    <>
      {data.map((jobPosting) => (
        <JobPosting key={jobPosting.id} id={jobPosting.id} />
      ))}
    </>
  );
}
