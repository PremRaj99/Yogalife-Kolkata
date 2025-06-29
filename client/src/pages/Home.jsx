import { IoIosCall } from "react-icons/io";
import Card from "../components/Card";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { yogaPrograms } from "../../data/yogaPrograms";
// import kolLogo from "../assets/kol-logo.png";

export default function Home() {
  const naturopathy = [
    {
      image: "https://cdn-icons-png.freepik.com/256/14869/14869700.png",
      title: "Hydrotherapy",
      answer:
        "Harnessing the therapeutic benefits of water through baths, jets, and wraps to stimulate circulation and detoxification.",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/256/4856/4856946.png",
      title: "Mud Therapy",
      answer:
        "Using mineral-rich mud to reduce inflammation, cool the body, and restore skin health.",
    },
    {
      image: "https://trendphysio.com/assets/png/x-Massage-Therapy.png",
      title: "Massage Therapy",
      answer:
        "Targeted manual techniques to relieve tension, improve blood flow, and promote deep relaxation.",
    },
    {
      iamge: "https://cdn-icons-png.flaticon.com/256/12024/12024705.png",
      title: "Diet & Nutrition Counseling",
      answer:
        "Personalized plans rooted in naturopathic principles to help you heal from within.",
    },
    {
      iamge: "https://cdn-icons-png.flaticon.com/256/2807/2807134.png",
      title: "Yoga & Meditation",
      answer:
        "Techniques to align the body and mind, reduce stress, and enhance self-awareness.",
    },
    {
      image: "https://cdn-icons-png.freepik.com/256/5418/5418643.png",
      title: "Acupressure & Reflexology",
      answer:
        "Stimulating pressure points to balance energy flow and support internal healing.",
    },
    {
      iamge:
        "https://cdn.iconscout.com/icon/free/png-256/free-home-remedies-icon-download-in-svg-png-gif-file-formats--homeopathy-herbal-medicine-ayurvedic-medical-services-pack-healthcare-icons-1607974.png",
      title: "Herbal Remedies",
      answer:
        "Safe, natural plant-based solutions to support organ function and overall vitality.",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Video Background */}
        <video
          src="yol.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col justify-center items-center gap-4 p-8 bg-black bg-opacity-70 w-full h-full">
          {/* Your content goes here */}
          <img
            src="/kol-logo.png"
            className="h-36 scale-150"
            alt=""
            style={{
              filter:
                "drop-shadow(0 4px 24px #fff) drop-shadow(0 2px 8px #a855f7)",
            }}
          />
          <h1 className="text-3xl font-bold text-white text-center">
            Welcome to the Yogalife
          </h1>
          <p className="text-gray-300 px-3 text-center flex flex-wrap items-center justify-center gap-2 leading-6">
            Building the Body <span className="text-red-200 scale-125">|</span>
            Modifying the Mind <span className="text-red-200 scale-125">|</span>
            Salvationing the Soul.
          </p>
          <div className="flex flex-col md:flex-row w-full items-center justify-center md:gap-3">
            <Link to="/program">
              <Button
                gradientDuoTone="purpleToPink"
                className="mt-4 w-full"
                size="md"
                pill
              >
                Join Our Program
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button
                gradientDuoTone="purpleToPink"
                className="mt-4 w-full"
                size="md"
                pill
                outline
              >
                <span>Contact Us</span>
                <IoIosCall className="text-lg ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------- YOGA PROGRAMS AND WORKSHOPS ------------ */}
      <div className="container mx-auto p-10 py-6 mb-10 bg-white bg-opacity-80 rounded">
        <h1 className="text-2xl font-bold">Yoga Programs & Workshops</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {yogaPrograms.map((item, index) => (
            <div
              key={index}
              className="flex flex-col text-center items-center justify-center"
            >
              <img
                src="data:image/jpeg;base64,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"
                className=""
                alt=""
              />
              <h2 className="md:text-xl font-medium mb-2">{item.title}</h2>
              <p className="text-xs text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border container mx-auto"></div>
      <div className="container mx-auto p-10 py-6 bg-white bg-opacity-80 rounded">
        <h1 className="text-2xl font-bold">Naturopathy Theraphies</h1>
        <div className="flex flex-col justify-center items-center my-10 gap-10">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2ab37bf4-074b-496b-ad0b-6fa2dc0cffe5/dfzvmlt-c777f8a0-b0ea-44d2-a447-79e66d5415c4.png/v1/fill/w_320,h_380/chakras_map_svg_by_revinchristianhatol_dfzvmlt-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzgwIiwicGF0aCI6IlwvZlwvMmFiMzdiZjQtMDc0Yi00OTZiLWFkMGItNmZhMmRjMGNmZmU1XC9kZnp2bWx0LWM3NzdmOGEwLWIwZWEtNDRkMi1hNDQ3LTc5ZTY2ZDU0MTVjNC5wbmciLCJ3aWR0aCI6Ijw9MzIwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlLm9wZXJhdGlvbnMiXX0.CMZ8_ObH31E-AmwJ1-QvWVn9eGx8DYWa3GTLccupPjo"
            alt=""
            style={{
              filter:
                "drop-shadow(0 4px 24px #fff) drop-shadow(0 2px 8px #a855f7)",
            }}
          />
          <p className="italic text-center">
            Discover the healing power of nature with our holistic Naturopathy
            Therapies. Rooted in ancient wisdom and backed by modern science,
            naturopathy focuses on stimulating the body’s inherent ability to
            restore balance and wellness.
          </p>
          <p className="italic text-center">
            At our center, we offer a wide range of therapies designed to
            detoxify, rejuvenate, and heal — without relying on synthetic drugs
            or invasive procedures.
          </p>
          <p className="font-semibold text-center">
            Our Core Therapies Include:
          </p>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {naturopathy.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <img
                  src={item.iamge}
                  className="w-32 aspect-square object-cover"
                  alt=""
                />
                <strong>{item.title}</strong>
                <p className="text-xs text-center max-w-[40ch]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border container mx-auto"></div>
      <div className="container mx-auto p-10 py-6 bg-white bg-opacity-80 rounded">
        <h1 className="text-2xl font-bold">
          Yoga and wellness Retreat (Domestic & International)
        </h1>
        <div className="flex flex-wrap justify-center items-center my-10 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div className="border container mx-auto"></div>
      <div className="container p-10 mx-auto py-6 bg-white bg-opacity-80 rounded">
        <h1 className="text-2xl font-bold">Doctor Consultanoy</h1>
        <div className="flex flex-wrap justify-center items-center my-10 gap-4">
          <FAQ />
        </div>
      </div>
      <CTA />
    </div>
  );
}
