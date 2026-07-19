import SectionWrapper from "../layout/SectionWrapper";
import { naturopathy } from "../../../data/homeData"; 
import { motion } from "framer-motion";

export default function NaturopathySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
    },
  };

  return (
    <SectionWrapper 
      title="Naturopathy Therapies" 
      subtitle="Discover the healing power of nature. Rooted in ancient wisdom and backed by modern science, naturopathy stimulates the body’s inherent ability to restore balance."
      className="bg-white"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {naturopathy.map((item, index) => (
          <motion.div 
            key={index} 
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-white shadow-sm flex items-center justify-center p-4 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
              <img
                src={item.image}
                className="w-full h-full object-contain"
                alt={item.title}
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-sm text-slate-600 text-center leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}