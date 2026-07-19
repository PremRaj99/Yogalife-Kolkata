import React from "react";
import { motion } from "framer-motion";

export default function AboutMemberCard({
  image = "",
  title = "",
  name = "",
  shortIntro = "",
  variants,
}) {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -5, shadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
      className="border rounded-xl flex flex-col gap-2 p-3 bg-white hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-lg">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={image} 
          className="aspect-square object-cover w-full h-full" 
          alt={name} 
        />
      </div>
      {/* title */}
      {title && <span className="text-xs font-bold text-red-700 uppercase tracking-wider">{title}</span>}
      {/* Name */}
      <p className="font-semibold text-slate-900 leading-tight">{name}</p>
      {/* Short Intro */}
      {shortIntro && <p className="text-xs text-slate-600 leading-relaxed">{shortIntro}</p>}
    </motion.div>
  );
}
