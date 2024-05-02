import React from "react";
import CTA from "../components/CTA";
import YogaClassCard from "../components/YogaClassCard";

export default function About() {
  return (
    <div className="w-ful">
      <div className="container mx-auto my-5 p-5">
        <h1 className="font-bold text-2xl">About Us</h1>
        <div className="py-10">
          <h2 className="text-3xl font-semibold font-serif">
            YOGACHARYA SHAMBHU RAJ PANDIT
          </h2>
          <div className="flex flex-col-reverse md:flex-row gap-1 sm:gap-8 my-5">
            <div className="flex-1">
              <p className="text-gray-600 text-sm sm:text-base">
                A man with profound inclination to serve mankind and humanity
                started his voyage at the age of 13, searching for a true path
                in life. He has spent his initial years exploring the Indian
                heritage, learning about Yoga, Tapa Saadhana, Naturopathy from
                various renowned personnels like Pandit Shriram Sharma Acharya,
                Deoraha Baba, Pundit Radheshyam Mishra, Shri Siddheshwar
                Brahmarshi Gurudev. He has travelled across the country gaining
                knowledge, teaching and researching in the areas of health,
                nature and social welfare. He is currently the Founder and
                Director of Yogalife Kolkata and “Chalo Chale Prakriti ki
                or”,Chairman of the Indian Yoga Association (IYA) West Bengal
                Chapter, Chiropractor, Naturopath, Author, Researcher and
                Eminent Yogacharya – Shri Siddheshwar Tirtha Ashram, Tirupati
                Balaji and Ujjain Yoga life Society, Intermational (Yogalife
                Global). He is also a counselor and researcher in the areas of
                mental, physical and spirituality. Yogacharya Shambhuraj ji has
                been doing professional yoga training, natural medicinal
                practice, social welfare, nature conservation, yoga and
                lifestyle practices, ancient and traditional yoga practices and
                the skills of the Chiropractor and is able to treat all types of
                diseases without any medication and surgery and is a good
                mental, physical health, medical, spiritual counselor and
                researcher since the year 2011. Yogalife Kolkata has been
                providing corporate yoga services since 2017 in
                Kolkata,Delhi,Chennai,Bangalore,Mumbai and others part of india.
                Pandit ji services are also being provided in foreign countries
                such as Dubai,California,Grecce,Baku,indonesia,UK and other
                countries and locations.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img
                src="shambhu about image.jpg"
                className="rounded-full w-[500px] aspect-square object-cover p-10"
                alt=""
              />
            </div>
          </div>
        </div>
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
