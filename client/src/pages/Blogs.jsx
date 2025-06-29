import React from "react";
import CTA from "../components/CTA";
import HeadingPage from "../components/common/HeadingPage";

export default function Blogs() {
  return (
    <div className="w-full">
      <HeadingPage>Blog</HeadingPage>
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-5xl">No Post available...</p>
      </div>
      <CTA />
    </div>
  );
}
