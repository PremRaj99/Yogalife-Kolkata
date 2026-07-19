import CTA from "../components/common/CTA";
import AboutMemberCard from "../components/common/AboutMemberCard";
import HeadingPage from "../components/common/HeadingPage";
import { motion } from "framer-motion";

export default function About() {
  const members = [
    {
      image: "./memberImage/shambhu-about-image.jpeg",
      title: "Pandit Ji",
      name: "Yogacharya Shambhu Raj Pandit",
      shortIntro: `International Yoga Guru
Founder & Director of Yogalife Kolkata and Ishawarah Foundation.
Spiritual and Medical Researcher, Writer, and Social Worker.`,
    },
    {
      image: "./memberImage/Dr.-RadheShyam-Mishra.jpeg",
      title: "Guru Ji",
      name: "Dr. Radheshyam Mishra",
      shortIntro: `Renowned International Yoga Guru  
Founder & Director of Yogalife Global (UYLS) and Yogalife Ashram – Brazil & India.  
President of Yogalife Kolkata.`,
    },
    {
      image: "./memberImage/rituGoyal.jpeg",
      title: "Psychotherapist",
      name: "Ritu Goel",
      shortIntro: `Certified Psychotherapist  
Holds a Master's degree and Diploma in Psychotherapy.  
Secretary of Yogalife Kolkata.`,
    },
    {
      image: "./memberImage/Arkaprava.jpg",
      title: "Ayurvedacharya",
      name: "Vaidya (Dr).Arkaprava Jana",
      shortIntro: `BAMS (WBUHS), Director of Ayuprava Holistic Healthcare Clinic  
Official Representative of Yogalife Kolkata.`,
    },
    {
      image: "./memberImage/Dr.-Ashish-Arya.jpg",
      title: "Yoga Master",
      name: "Dr. Ashish Arya (Aadi Dev)",
      shortIntro: `BHMS, RYT 500, and Master's degree in Yoga Therapy (S-VYASA University, Bangalore).  
Joint Secretary of Yogalife Kolkata.`,
    },
    {
      image: "./memberImage/tanmay.jpg",
      title: "Yoga Teacher",
      name: "Tanmoy Roy",
      shortIntro: `RYT 300 and Bachelor's degree in Yoga Therapy.  
Convener, Publicity and Events at Yogalife Kolkata.`,
    },
  ];

  const Teachers = [
    {
      name: "RYT 300 Tanmoy Roy",
      image: "./memberImage/tanmayRoy.jpg",
    },
    {
      name: "RYT 500 Silpa Majumder",
      image: "./memberImage/shilpa.jpg",
    },
    {
      name: "RYT 200 Puja Prashad",
      image: "./memberImage/puja.jpg",
    },
    {
      name: "RYT 200 Shweta vats",
      image: "./memberImage/sweta.jpg",
    },
    {
      name: "RYT 200 Shradha chhaochharia",
      image: "./memberImage/shradha.jpg",
    },
    {
      name: "RYT 200 Seema Rawat",
      image: "./memberImage/shimaRawat.jpg",
    },
    {
      name: "RYT 200 Mridul dahaya",
      image: "./memberImage/mridulDaiya.jpg",
    },
    {
      name: "RYT 200 Vijay Laxmi",
      image: "./memberImage/vijayLaxmi.jpg",
    },
    {
      name: "RYT 200 Shital Gupta",
      image: "./memberImage/sital.jpg",
    },
    {
      name: "RYT 200 Monika Khadkia",
      image: "./memberImage/monika.jpg",
    },
  ];

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
    <div className="w-full overflow-hidden bg-slate-50">
      <HeadingPage>About Us</HeadingPage>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-6xl mx-auto mt-8 px-4"
      >
        <h2 className="font-bold text-2xl text-slate-900 border-b border-slate-200 pb-3">Leadership & Advisory</h2>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-6xl mx-auto gap-6 p-4 my-4"
      >
        {members.map((memeber, index) => (
          <AboutMemberCard
            key={index}
            variants={cardVariants}
            title={memeber.title}
            name={memeber.name}
            image={memeber.image}
            shortIntro={memeber.shortIntro}
          />
        ))}
      </motion.div>
      
      {/* Our Expert Teacher */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container max-w-6xl mx-auto px-4 mt-8"
      >
        <h2 className="font-bold text-2xl text-slate-900 border-b border-slate-200 pb-3">
          Our Expert Teachers
        </h2>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="container grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 max-w-6xl mx-auto gap-4 mb-12 p-4"
      >
        {Teachers.map((memeber, index) => (
          <AboutMemberCard
            key={index}
            variants={cardVariants}
            name={memeber.name}
            image={memeber.image}
          />
        ))}
      </motion.div>

      <CTA />
    </div>
  );
}
