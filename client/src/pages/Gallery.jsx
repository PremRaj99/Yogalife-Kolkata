import React from "react";
import CTA from "../components/CTA";
import HeadingPage from "../components/common/HeadingPage";

export default function Gallery() {
  return (
    <div className="w-full">
      <HeadingPage>Gallery</HeadingPage>
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-5xl">No Image available...</p>
      </div>
      <CTA />
    </div>
  );
}
