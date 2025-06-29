import React from "react";

export default function AboutMemberCard({
  image = "",
  title = "",
  name = "",
  shortIntro = "",
}) {
  return (
    <div className="border flex flex-col gap-2 p-2 hover:border-2 hover:bg-gray-100">
      {/* Image */}
      <img src={image} className="aspect-square object-cover" alt="" />
      {/* title */}
      <span className="text-xs text-red-700">{title}</span>
      {/* Name */}
      <p className="font-semibold">{name}</p>
      {/* Short Intro */}
      <p className="text-xs">{shortIntro}</p>
    </div>
  );
}
