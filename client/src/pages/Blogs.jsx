import React from "react";
import CTA from "../components/CTA";
import HeadingPage from "../components/common/HeadingPage";

export default function Blogs() {
  return (
    <div className="w-full">
      <HeadingPage>Blog</HeadingPage>
      <div className="container mx-auto p-10 py-6 mb-10 bg-white bg-opacity-80 rounded">
              <h1 className="text-2xl font-bold mb-6">Our Vlog</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <video controls src="./vlog/Vlog1.mp4"></video>
                <video controls src="./vlog/Vlog2.mp4"></video>
                <video controls src="./vlog/Vlog3.mp4"></video>
              </div>
            </div>
      <CTA />
    </div>
  );
}
