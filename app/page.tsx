"use client";

import dynamic from "next/dynamic";

const MapApp = dynamic(() => import("@/components/map-app"), { ssr: false });

export default function Home() {
  return (
    <main className=" w-full h-full">
      <MapApp />
    </main>
  );
}
