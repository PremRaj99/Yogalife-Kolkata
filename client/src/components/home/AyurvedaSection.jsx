import SectionWrapper from "../layout/SectionWrapper";
import { ayurvedaTherapies } from "../../../data/homeData";
import { motion } from "framer-motion";

export default function AyurvedaSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <SectionWrapper 
      title="Ayurveda & Holistic Wellness" 
      subtitle="Natural healing for body, mind, and spirit. Detoxify, rejuvenate, and heal without relying on synthetic drugs or invasive procedures."
      className="bg-slate-50"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
      >
        {ayurvedaTherapies.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center gap-4 group cursor-pointer"
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
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}