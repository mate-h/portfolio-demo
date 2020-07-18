import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export function CompanyLogoSkeleton(props: any) {
  return <Skeleton variant="circle" height={140} width={140} {...props} />;
}
