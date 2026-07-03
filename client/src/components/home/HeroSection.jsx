// src/components/home/HeroSection.jsx
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-slate-950 flex flex-col justify-center items-center overflow-hidden">
      
      {/* --- Premium Architectural Background --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] pointer-events-none" />
      {/* ---------------------------------------- */}

      <div className="relative z-10 flex flex-col justify-center items-center px-4 text-center w-full max-w-5xl mx-auto">
        
        {/* --- Custom Geometric Illustration --- */}
        <div className="relative w-50 md:w-80 group cursor-default">
          {/* Subtle spinning rings */}
          <img src="./kol-logo.png" alt="" />
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500 tracking-tighter leading-none mb-2">
          YOGALIFE
        </h1>
        
        <h3 className="text-slate-500 font-medium tracking-[0.4em] text-sm md:text-lg uppercase mb-5">
          Kolkata
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-sm md:text-base text-slate-400 font-medium mb-5 max-w-lg">
          <span className="hover:text-white transition-colors">Building the Body</span>
          <span className="text-slate-700">|</span>
          <span className="hover:text-white transition-colors">Modifying the Mind</span>
          <span className="text-slate-700">|</span>
          <span className="hover:text-white transition-colors">Nourishing the Soul</span>
        </div>
        
        {/* --- Action Buttons --- */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
          <Link to="/program" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
              <span>Join Our Program</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/contact-us" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3 bg-transparent border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2">
              <span>Contact Us</span>
              <Phone className="w-4 h-4 text-slate-400" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}