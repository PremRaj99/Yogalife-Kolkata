import React from "react";
import CTA from "../components/common/CTA";
import HeadingPage from "../components/common/HeadingPage";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-slate-50">
      <HeadingPage>Blog</HeadingPage>
      <div className="container max-w-6xl mx-auto p-4 py-8 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-3">Our Vlog Collection</h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8"
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-200 group"
            >
              <video
                className="w-full h-full object-cover aspect-[3/4]"
                controls
                preload="metadata"
                src={video}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <CTA />
    </div>
  );
}
