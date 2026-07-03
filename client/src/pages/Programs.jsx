import { yogaPrograms } from "../../data/yogaPrograms";
import CTA from "../components/common/CTA";
import HeadingPage from "../components/common/HeadingPage";

export default function Programs() {
  return (
    <div className="w-full">
      <HeadingPage>Program</HeadingPage>
      <div className="container max-w-6xl mx-auto p-4 py-6 mb-10 bg-white bg-opacity-80 rounded">
        <h1 className="text-2xl font-bold mb-6">Yoga Programs & Workshops</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      </div>
      <CTA />
    </div>
  );
}
