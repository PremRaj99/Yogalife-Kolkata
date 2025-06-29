import React from "react";
import CTA from "../components/CTA";
import HeadingPage from "../components/common/HeadingPage";
import ImageCard from "../components/common/ImageCard";
import { categorizedGalleryData } from "../../data/galleryData";

export default function Gallery() {

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="w-full">
      <HeadingPage>Gallery</HeadingPage>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Gallery</h1>
        {Object.keys(categorizedGalleryData).map((category, index) => {
          const [month, year] = category.split("-");
          const formattedCategory = `${
            monthNames[parseInt(month, 10) - 1]
          } ${year}`;
          return (
            <div key={index}>
              <h2 className="py-2 text-xl font-medium text-primary">
                {formattedCategory}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {categorizedGalleryData[category].map((gallery, idx) => (
                  <ImageCard key={idx} data={gallery} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <CTA />
    </div>
  );
}
