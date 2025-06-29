import { Button } from "flowbite-react";
import React from "react";
import { IoIosCall } from "react-icons/io";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="w-full flex-col-reverse py-4 pb-10 sm:pb-0 sm:py-0 sm:flex-row mx-auto flex min-h-[480px] justify-center items-center bg-indigo-500">
      {/* left hero section */}
      <div className="leading-8 p-8">
        <h1 className="font-bold text-white text-5xl text-center mb-8 sm:mb-4">
          Yogalife Kolkata
        </h1>
        <p className="text-gray-200 px-3 text-center sm:text-left flex flex-col leading-6">
          <span>Building the Body</span>
          <span>Modifying the Mind</span>
          <span>Salvationing the Soul.</span>
        </p>
        <div className="flex flex-col md:flex-row md:gap-3">
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
      {/* right hero section */}
      <div className="">
        <img
          src={
            "kol-logo.png"
          }
          alt="hero section Image"
          className="w-80 scale-125 rounded-[50%]"
        />
      </div>
    </div>
  );
}
