import React from "react";
import CTA from "../components/CTA";
import YogaClassCard from "../components/YogaClassCard";
import HeadingPage from "../components/common/HeadingPage";
import AboutMemberCard from "../components/common/AboutMemberCard";

export default function About() {
  const members = [
    {
      image: "./memberImage/shambhu-about-image.jpg",
      title: "Pandit Ji",
      name: "Yogacharya Shambhu Rah Pandit",
      shortIntro: `International Yoga Guru  
Founder & Director of Yogalife Kolkata and Ishawarah Foundation.`,
    },
    {
      image: "./memberImage/Dr.-RadheShyam-Mishra.jpeg",
      title: "Guru Ji",
      name: "Dr. Radheshyam Mishra",
      shortIntro: `Renowned International Yoga Guru  
Founder & Director of Yogalife Global (UYLS) and Yogalife Ashram – Brazil & India.`,
    },
    {
      image: "./memberImage/rituGoyal.jpg", // Update image if available
      title: "Psychotherapist",
      name: "Ritu Goel",
      shortIntro: `Certified Psychotherapist  
Holds a Master's degree and Diploma in Psychotherapy.`,
    },
    {
      image: "./memberImage/Arkaprava.jpg", // Update image if available
      title: "Ayurvedachariya",
      name: "Dr. Arkaprava Jana",
      shortIntro: `BAMS (WBUHS), Director of Ayuprava Holistic Healthcare Clinic  
Official Representative of Yogalife Kolkata.`,
    },
    {
      image: "./memberImage/Dr.-Ashish-Arya.jpg", // Update image if available
      title: "Vice president",
      name: "Dr. Ashish Arya (Aadi Dev)",
      shortIntro: `BHMS,RYT 500 and Master degree in yoga therapy(Svyasa University Banglore)`,
    },
  ];

  const Teachers = [
    {
      name: "Tonmoy Roy",
      image: "./memberImage/tanmay.jpg",
    },
    {
      name: "Silpa Majumder",
      image: "./memberImage/shilpa.jpg",
    },
    {
      name: "Puja Prashad",
      image: "./memberImage/puja.jpg",
    },
    {
      name: "Shweta vats",
      image: "./memberImage/sweta.jpg",
    },
    {
      name: "Shradha chhaochharia",
      image: "./memberImage/shradha.jpg",
    },
    {
      name: "Seema Rawat",
      image: "./memberImage/shimaRawat.jpg",
    },
    {
      name: "Mridul dahaya",
      image: "./memberImage/mridulDaiya.jpg",
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
      <h1 className="container mx-auto px-5 mt-10 font-bold text-2xl">Our Expert Techer</h1>
      <div className="container grid md:grid-cols-4 grid-cols-2 mx-auto gap-2 my-5 p-5">
        {Teachers.map((memeber, index) => (
          <AboutMemberCard
            key={index}
            name={memeber.name}
            image={memeber.image}
          />
        ))}
      </div>
      <div className="container mx-auto my-5 p-5">
        <h1 className="font-bold text-2xl">
          Know more about YOGA & MEDITATION
        </h1>
        <div className="flex flex-col md:flex-row gap-14 container justify-center my-14">
          <YogaClassCard
            image="Yoga class image.jpg"
            text="Yoga is not only workout but it is way of living which can make every second of your life easier. it is a process of working in and art of living."
          />
          <YogaClassCard
            image="Yoga class iamge2.jpg"
            text="We at YogaLife Global have enduringly believed that a place like us can exist that is totally dedicated to Yogic lifestyle, personal growth and the upliftment of each and every individual through Yogic efforts."
          />
        </div>
      </div>

      <CTA />
    </div>
  );
}
