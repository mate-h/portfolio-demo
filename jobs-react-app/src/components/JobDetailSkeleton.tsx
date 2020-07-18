import React from "react";
import { BackNavigation, CompanyLogoSkeleton } from ".";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

export function JobDetailSkeleton() {
  return (
    <Box p={2}>
      <div>
        <BackNavigation fallback="/" />
      </div>
      <CompanyLogoSkeleton
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
      <div>
        <Skeleton width={144} height={12} />
        <Skeleton width={240} height={32} />
      </div>
      <p>
        {[...new Array(12)].map((_, i) => (
          <Skeleton key={i} width={600 + Math.floor(Math.random() * 8) * 8} />
        ))}
        <Skeleton width={320} />
      </p>
    </Box>
  );
}
