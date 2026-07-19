import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import { HiMail, HiUser } from "react-icons/hi";
import { IoMdCall } from "react-icons/io";
import HeadingPage from "../components/common/HeadingPage";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

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
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (
      formdata.name === "" ||
      formdata.email === "" ||
      formdata.phone === "" ||
      formdata.message === ""
    ) {
      setLoading(false);
      return setError("Please fill all the fields");
    }

    const templateParams = {
      title: formdata.name,
      name: formdata.name,
      email: formdata.email,
      phone: formdata.phone,
      message: formdata.message,
      date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      const result = await emailjs.send(
        "service_dvbzjwi",
        "template_ozvoou1",
        {
          ...templateParams,
          senderEmail: templateParams.email,
          receiverEmail: "yogalifekolkata@gmail.com",
          email: "",
        },
        "41HTFVEoHyRkPsjJP"
      );
      const userResult = await emailjs.send(
        "service_dvbzjwi",
        "template_as1cx7p",
        templateParams,
        "41HTFVEoHyRkPsjJP"
      );
      console.log(result.text);
      setSuccess("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: BsFacebook, color: "text-blue-700 hover:text-blue-600", url: "https://www.facebook.com/share/19Wox1VPcU/?mibextid=wwXIfr" },
    { icon: BsInstagram, color: "text-pink-600 hover:text-pink-700", url: "https://www.instagram.com/yogalifekolkata?utm_source=qr" },
    { icon: BsTwitterX, color: "text-slate-700 hover:text-slate-900", url: "https://x.com/Shambhu40287904?t=fD_gnGm5cuv5cH4YyLgqxA&s=08" },
    { icon: BsYoutube, color: "text-red-700 hover:text-red-600", url: "/" },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <HeadingPage>Contact Us</HeadingPage>
      <div className="my-10 flex items-center justify-center">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 flex max-w-md flex-col gap-4 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-200"
          onSubmit={handleSubmit}
        >
          <div className="px-1">
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
          <div className="px-1">
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
          <div className="px-1">
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
          <div className="max-w-md px-1">
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
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button gradientDuoTone="purpleToPink" className="w-full mt-2 font-bold" type="submit">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Sending...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </motion.div>
          {error && (
            <Alert
              color="failure"
              className="my-3 flex items-center justify-center"
              rounded
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              color="success"
              className="my-3 flex items-center justify-center"
              rounded
            >
              {success}
            </Alert>
          )}
        </motion.form>
      </div>

      <div className="container max-w-md mx-auto gap-4 flex items-center px-4">
        <div className="flex-1 border-t border-slate-300"></div>
        <p className="text-slate-500 font-bold text-sm">OR CONNECT WITH US</p>
        <div className="flex-1 border-t border-slate-300"> </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-6 items-center justify-center my-10 text-3xl"
      >
        {socialLinks.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.a
              key={idx}
              whileHover={{ scale: 1.25, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={item.color}
            >
              <IconComp />
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
