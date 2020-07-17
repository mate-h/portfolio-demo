import { useParams } from "react-router-dom";

import React from "react";

export function JobDetailPage() {
  const { id } = useParams();
  return (
    <div>
      Job detail page<code>{id}</code>
    </div>
  );
}
