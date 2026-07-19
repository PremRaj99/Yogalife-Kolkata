import { Navbar } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <motion.div 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b-2 bg-slate-100 z-50 sticky top-0"
    >
      <Navbar fluid rounded className=" container max-w-6xl mx-auto bg-slate-100">
        <Navbar.Brand as={Link} to="/">
          <motion.img
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src="/kol-logo.png"
            className="mr-3 h-12"
            alt="Yogalife Kolkata Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-bold text-[#AF2226]">
            Yogalife Kolkata
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link as={Link} to="/" active={path === "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} to="/about" active={path === "/about"}>
            About
          </Navbar.Link>
          <Navbar.Link as={Link} to="/program" active={path === "/program"}>
            Program
          </Navbar.Link>
          <Navbar.Link as={Link} to="/blog" active={path === "/blog"}>
            Blog
          </Navbar.Link>
          <Navbar.Link as={Link} to="/gallery" active={path === "/gallery"}>
            Gallery
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/contact-us"
            active={path === "/contact-us"}
          >
            Contact Us
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </motion.div>
  );
}
