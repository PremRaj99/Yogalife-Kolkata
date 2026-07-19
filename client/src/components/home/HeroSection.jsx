// src/components/home/HeroSection.jsx
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } 
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-slate-950 flex flex-col justify-center items-center overflow-hidden">
      
      {/* --- Premium Ethereal Background Illustration --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.img
          src="/hero-bg.png"
          alt="Yoga & Wellness Background Illustration"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
        />
        {/* Dark radial gradient mask for high contrast text readability */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-brightness-75" />
      </motion.div>

      {/* Decorative Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" />

      {/* Ambient Glowing Orbs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/20 rounded-full blur-[140px] pointer-events-none z-0" 
      />
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_85%)] pointer-events-none z-0" />

      {/* Rotating Background Mandala Accent 1 (Left) */}
      <motion.svg 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -left-32 top-1/4 w-96 h-96 text-white/5 pointer-events-none z-0 hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="25" />
        <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" />
        <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" />
      </motion.svg>

      {/* Rotating Background Mandala Accent 2 (Right) */}
      <motion.svg 
        animate={{ rotate: -360 }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        className="absolute -right-32 bottom-1/4 w-[26rem] h-[26rem] text-red-500/10 pointer-events-none z-0 hidden lg:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="30" />
        <polygon points="50,10 65,35 90,50 65,65 50,90 35,65 10,50 35,35" />
        <polygon points="50,20 60,40 80,50 60,60 50,80 40,60 20,50 40,40" />
      </motion.svg>
      {/* ---------------------------------------- */}

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col justify-center items-center px-4 text-center w-full max-w-5xl mx-auto"
      >
        
        {/* --- Custom Geometric Logo --- */}
        <motion.div variants={logoVariants} className="relative w-44 md:w-64 group cursor-default mb-2">
          <img src="./kol-logo.png" alt="Yogalife Kolkata Logo" className="drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]" />
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 tracking-tighter leading-none mb-2 drop-shadow-sm"
        >
          YOGALIFE
        </motion.h1>
        
        <motion.h3 
          variants={itemVariants}
          className="text-red-400 font-semibold tracking-[0.4em] text-sm md:text-lg uppercase mb-5 drop-shadow"
        >
          Kolkata
        </motion.h3>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-sm md:text-base text-slate-300 font-medium mb-6 max-w-xl backdrop-blur-sm bg-slate-900/40 px-6 py-2 rounded-full border border-white/10 shadow-inner"
        >
          <span className="hover:text-white transition-colors">Building the Body</span>
          <span className="text-slate-600">|</span>
          <span className="hover:text-white transition-colors">Modifying the Mind</span>
          <span className="text-slate-600">|</span>
          <span className="hover:text-white transition-colors">Nourishing the Soul</span>
        </motion.div>
        
        {/* --- Action Buttons --- */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
          <Link to="/program" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full px-8 py-3.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 group"
            >
              <span>Join Our Program</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <Link to="/contact-us" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full px-8 py-3.5 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Contact Us</span>
              <Phone className="w-4 h-4 text-slate-400" />
            </motion.button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}