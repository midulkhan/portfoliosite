"use client";

import dynamic from "next/dynamic";

const WaterWave = dynamic(() => import("react-water-wave"), {
  ssr: false,
});