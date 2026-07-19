import CTA from "../components/common/CTA";
import HeadingPage from "../components/common/HeadingPage";
import { motion } from "framer-motion";

const images = Object.values(
  import.meta.glob("/src/assets/gallery/*.{jpg,jpeg,png,svg,webp}", {
    eager: true,
  })
).map((mod) => mod.default);

export default function Gallery() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-slate-50">
      <HeadingPage>Gallery</HeadingPage>
      <div className="container max-w-6xl p-4 py-8 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-3">Photo Gallery</h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px] my-6"
        >
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-white group cursor-pointer relative"
            >
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <CTA />
    </div>
  );
}
