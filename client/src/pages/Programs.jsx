import { yogaPrograms } from "../../data/yogaPrograms";
import CTA from "../components/common/CTA";
import HeadingPage from "../components/common/HeadingPage";
import { motion } from "framer-motion";

export default function Programs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-slate-50">
      <HeadingPage>Program</HeadingPage>
      <div className="container max-w-6xl mx-auto p-4 py-8 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-3">Yoga Programs & Workshops</h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8"
        >
          {yogaPrograms.map((item, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="flex flex-col group cursor-pointer bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-4 bg-slate-200 border border-slate-100">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={item.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center px-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <CTA />
    </div>
  );
}
