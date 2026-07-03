import SectionWrapper from "../layout/SectionWrapper";
import { retreats } from "../../../data/homeData";
import { MapPin } from "lucide-react";

export default function RetreatsSection() {
  return (
    <SectionWrapper 
      title="Yoga & Wellness Retreats" 
      subtitle="Escape the noise. Join our domestic and international retreats to heal, recharge, and reconnect in the world's most serene locations."
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {retreats.map((retreat, index) => (
          <div 
            key={index} 
            className="flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            {/* Image Banner */}
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img 
                src={retreat.image} 
                alt={retreat.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle dark gradient that appears on hover for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors flex items-start justify-between gap-2">
                {retreat.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                {retreat.description}
              </p>
              
              <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider gap-1.5 mt-auto">
                <MapPin className="w-4 h-4 text-slate-900" />
                <span>Explore Destination</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}