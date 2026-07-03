import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react"; // Replaced react-icons with lucide-react

export default function CTA() {
  return (
    <div className="py-16 md:py-24 bg-slate-900 w-full flex items-center justify-center px-4">
      <div className="container max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Text and Actions */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Begin Your Journey With Yogalife
          </h2>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8 text-slate-300 font-medium text-sm md:text-base">
            <span>Building the Body</span>
            <span className="text-slate-600">|</span>
            <span>Modifying the Mind</span>
            <span className="text-slate-600">|</span>
            <span>Nourishing the Soul</span>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Link to="/program" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg shadow-white/10">
                Join Our Program
              </button>
            </Link>
            
            <Link to="/contact-us" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <span>Contact Us</span>
                <PhoneCall className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl transform scale-110"></div>
          <img
            src="/kol-logo.png"
            alt="Yogalife Kolkata Logo"
            className="relative w-48 md:w-64 aspect-square object-contain drop-shadow-2xl"
          />
        </div>
        
      </div>
    </div>
  );
}