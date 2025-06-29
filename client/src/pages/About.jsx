import CTA from "../components/CTA";
import AboutMemberCard from "../components/common/AboutMemberCard";
import HeadingPage from "../components/common/HeadingPage";

export default function About() {
  const members = [
    {
      image: "./memberImage/shambhu-about-image.jpg",
      title: "Pandit Ji",
      name: "Yogacharya Shambhu Raj Pandit",
      shortIntro: `nternational Yoga Guru
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
      image: "./memberImage/rituGoyal.jpg",
      title: "Psychotherapist",
      name: "Ritu Goel",
      shortIntro: `Certified Psychotherapist  
Holds a Master's degree and Diploma in Psychotherapy.  
Secretary of Yogalife Kolkata.`,
    },
    {
      image: "./memberImage/Arkaprava.jpg",
      title: "Ayurvedacharya",
      name: "Vaidya (Dr).Arkaprava Jana",
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
      name: "Tonmoy Roy",
      shortIntro: `RYT 300 and Bachelor's degree in Yoga Therapy.  
Convener, Publicity and Events at Yogalife Kolkata.`,
    },
  ];

  const Teachers = [
    {
      name: "RYT 300 Tonmoy Roy",
      image: "./memberImage/tanmay.jpg",
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
  ];

  return (
    <div className="w-ful overflow-hidden">
      <HeadingPage>About Us</HeadingPage>
      <div className="container mx-auto my-5 p-5">
        <h1 className="font-bold text-2xl">About Us</h1>
      </div>
      <div className="container grid md:grid-cols-4 grid-cols-2 mx-auto gap-2 my-5 p-5">
        {members.map((memeber, index) => (
          <AboutMemberCard
            key={index}
            title={memeber.title}
            name={memeber.name}
            image={memeber.image}
            shortIntro={memeber.shortIntro}
          />
        ))}
      </div>
      {/* Our Expert Teacher */}
      <h1 className="container mx-auto px-5 mt-10 font-bold text-2xl">
        Our Expert Teacher
      </h1>
      <div className="container grid md:grid-cols-4 grid-cols-2 mx-auto gap-2 my-5 p-5">
        {Teachers.map((memeber, index) => (
          <AboutMemberCard
            key={index}
            name={memeber.name}
            image={memeber.image}
          />
        ))}
      </div>
      <CTA />
    </div>
  );
}
