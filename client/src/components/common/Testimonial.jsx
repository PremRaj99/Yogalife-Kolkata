import SectionWrapper from "../layout/SectionWrapper";

export default function Testimonial() {
  // Ideally, move these paths to your data file, but hardcoded here for illustration
  const videos = [
    "./testimonial/Testimonial1.mp4", "./testimonial/Testimonial2.mp4",
    "./testimonial/Testimonial3.mp4", "./testimonial/Testimonial4.mp4",
    "./testimonial/Testimonial5.mp4", "./testimonial/Testimonial6.mp4",
    "./testimonial/Testimonial7.mp4", "./testimonial/Testimonial8.mp4",
    "./testimonial/Testimonial9.mp4"
  ];

  return (
    <SectionWrapper 
      title="Testimonials & Feedback" 
      subtitle="Hear directly from our community about their journey to wellness and peace."
      className="bg-slate-50"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {videos.map((src, index) => (
          <div 
            key={index} 
            className="relative rounded-2xl overflow-hidden bg-slate-200 shadow-sm border border-slate-200 group"
          >
            <video 
              className="w-full h-full object-cover aspect-[3/4]" 
              controls 
              preload="metadata"
              src={src}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}