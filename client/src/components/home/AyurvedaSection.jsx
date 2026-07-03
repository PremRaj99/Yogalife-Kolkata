import SectionWrapper from "../layout/SectionWrapper";
import { ayurvedaTherapies } from "../../../data/homeData";

export default function AyurvedaSection() {
  return (
    <SectionWrapper 
      title="Ayurveda & Holistic Wellness" 
      subtitle="Natural healing for body, mind, and spirit. Detoxify, rejuvenate, and heal without relying on synthetic drugs or invasive procedures."
      className="bg-slate-50"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {ayurvedaTherapies.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center gap-4 group"
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-sm border border-slate-200">
              <img
                src={item.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={item.title}
              />
            </div>
            <div className="text-center px-2">
              <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}