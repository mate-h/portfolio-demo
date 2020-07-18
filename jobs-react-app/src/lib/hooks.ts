import { useFetchListPositions, useFetchJobPosting } from "./github-jobs/api";
import { useAction } from "./actions";
import { useStore } from "./store";
import { useJobPosting, useJobPostings, useSearchForm } from "./selectors";
import { useEffect, useRef } from "react";

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export {
  useFetchListPositions,
  useFetchJobPosting,
  useAction,
  useStore,
  useJobPosting,
  useJobPostings,
  useSearchForm,
  usePrevious,
};
