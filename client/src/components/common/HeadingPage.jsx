import { motion } from "framer-motion";

export default function HeadingPage({ children = "Title"}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full p-8 bg-slate-900 text-white font-bold text-center text-4xl"
    >
      {children}
    </motion.div>
  );
}
