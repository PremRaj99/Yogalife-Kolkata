import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { HiMail, HiUser } from "react-icons/hi";
import React, { useState } from "react";
import { IoMdCall } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import CTA from "../components/CTA";
import HeadingPage from "../components/common/HeadingPage";

export default function ContactUs() {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    e.preventDefault();
    if (
      formdata.name === "" ||
      formdata.email === "" ||
      formdata.phone === "" ||
      formdata.message === ""
    ) {
      setLoading(false);
      return setError("Please fill all the fields");
    }
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (!res.status === 201) {
        setLoading(false);
        return setError(data.message);
      }
      setSuccess("Thank you! Your message has been sent Successfully.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return setError(data.message);
    }
  };

  return (
    <div className="w-full">
      <HeadingPage>Contact Us</HeadingPage>
      <div className="my-10 flex items-center justify-center">
        <form
          className="flex-1 flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="px-4">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              type="text"
              icon={HiUser}
              placeholder="Name"
              value={formdata.name}
              onChange={(e) =>
                setFormData({ ...formdata, name: e.target.value })
              }
              required
            />
          </div>
          <div className="px-4">
            <div className="mb-2 block">
              <Label htmlFor="email4" value="Your email" />
            </div>
            <TextInput
              id="email4"
              type="email"
              icon={HiMail}
              placeholder="name@example.com"
              value={formdata.email}
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
              }
              required
            />
          </div>
          <div className="px-4">
            <div className="mb-2 block">
              <Label htmlFor="phn" value="Your Number" />
            </div>
            <TextInput
              id="phn"
              type="text"
              minLength={10}
              maxLength={10}
              icon={IoMdCall}
              placeholder="9999*****9"
              value={formdata.phone}
              onChange={(e) =>
                setFormData({ ...formdata, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="max-w-md px-4">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required
              rows={4}
              value={formdata.message}
              onChange={(e) =>
                setFormData({ ...formdata, message: e.target.value })
              }
            />
          </div>
          <Button gradientDuoTone="purpleToPink" className="mx-4" type="submit">
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
          {error && (
            <Alert
              color="failure"
              className="my-5 flex items-center justify-center"
              rounded
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              color="success"
              className="my-5 flex items-center justify-center"
              rounded
            >
              {success}
            </Alert>
          )}
        </form>
      </div>
      <div className="container mx-auto gap-4 flex items-center">
        <div className="flex-1 border"></div>
        <p className="text-gray-500">OR</p>
        <div className="flex-1 border"> </div>
      </div>
      <div className="flex gap-10 items-center justify-center my-10 text-5xl text-gray-800">
        <a href="https://www.facebook.com/share/19Wox1VPcU/?mibextid=wwXIfr">
          <BsFacebook className="text-blue-700 hover:text-blue-600 transition-all duration-75" />
        </a>
        <a href="https://www.instagram.com/yogalifekolkata?utm_source=qr">
          <BsInstagram className="text-pink-600 hover:text-pink-700 transition-all duration-75" />
        </a>
        <a href="https://x.com/Shambhu40287904?t=fD_gnGm5cuv5cH4YyLgqxA&s=08 ">
          <BsTwitterX className="text-gray-700 hover:text-gray-900 transition-all duration-75" />
        </a>
        <a href="/">
          <BsYoutube className="text-red-700 hover:text-red-600 transition-all duration-75" />
        </a>
      </div>
      {/* < CTA /> */}
    </div>
  );
}
