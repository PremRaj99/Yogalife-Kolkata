import CTA from "../components/CTA";
import HeadingPage from "../components/common/HeadingPage";
const images = Object.values(
  import.meta.glob("/src/assets/gallery/*.{jpg,jpeg,png,svg,webp}", {
    eager: true,
  })
).map((mod) => mod.default);

export default function Gallery() {
  console.log(images);
  return (
    <div className="w-full">
      <HeadingPage>Gallery</HeadingPage>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] my-6">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-xl">
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <span>{img}</span>
              <span>Hello</span>
            </div>
          ))}
        </div>
      </div>
      <CTA />
    </div>
  );
}
