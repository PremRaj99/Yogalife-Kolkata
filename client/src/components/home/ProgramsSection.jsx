import SectionWrapper from "../layout/SectionWrapper";
import { yogaPrograms } from "../../../data/homeData";

export default function ProgramsSection() {
  return (
    <SectionWrapper 
      title="Yoga Programs & Workshops" 
      subtitle="Transform your body and mind with our specialized yoga programs designed for all levels of experience."
      className="bg-slate-50"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {yogaPrograms.map((item, index) => (
          <div key={index} className="flex flex-col group cursor-pointer">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl mb-5 bg-slate-200 border border-slate-200 shadow-sm">
              <img
                src={item.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="text-center px-2">
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-slate-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}