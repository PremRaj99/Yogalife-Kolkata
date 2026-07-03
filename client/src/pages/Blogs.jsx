import React from "react";
import CTA from "../components/common/CTA";
import HeadingPage from "../components/common/HeadingPage";

const videos = [
  "./vlog/Vlog1.mp4",
  "./vlog/Vlog2.mp4",
  "./vlog/Vlog3.mp4",
  "./vlog/Vlog4.mp4",
  "./vlog/Vlog5.mp4",
  "./vlog/Vlog6.mp4",
  "./vlog/Vlog7.mp4",
  "./vlog/Vlog8.mp4",
  "./vlog/Vlog9.mp4",
];

export default function Blogs() {
  return (
    <div className="w-full">
      <HeadingPage>Blog</HeadingPage>
      <div className="container max-w-6xl mx-auto p-4 py-6 mb-10 bg-white bg-opacity-80 rounded">
        <h1 className="text-2xl font-bold mb-6">Our Vlog</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden bg-slate-200 shadow-sm border border-slate-200 group"
            >
              <video
                className="w-full h-full object-cover aspect-[3/4]"
                controls
                preload="metadata"
                src={video}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
      <CTA />
    </div>
  );
}
