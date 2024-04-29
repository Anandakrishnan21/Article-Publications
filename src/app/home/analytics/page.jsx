"use client";
import React, { Suspense } from "react";
import Loading from "../loading";
import AnalyticsPageContent from "@/components/analytics/AnalyticsPageContent";

function AnalyticsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AnalyticsPageContent />
    </Suspense>
  );
}

export default AnalyticsPage;
