import React from "react";

import { Link } from "react-router-dom";

import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function FooterComponents() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <Link to="/" className="flex items-center pb-10">
            <Footer.Brand
              className="h-20 sm:h-24"
              src="/kol-logo.png"
              alt="Flowbite Logo"
              name="Yogalife Kolkata"
            />
            <span className="text-2xl self-center font-bold text-[#AF2226]">
              Yogalife Kolkata
            </span>
          </Link>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Yogalife Kolkata</Footer.Link>
                <Footer.Link href="https://www.github.com/premraj99">
                  Developed by Prem Raj
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Instagram</Footer.Link>
                <Footer.Link href="#">WhatsApp Group</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Yogalife Kolkata™"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/share/19Wox1VPcU/?mibextid=wwXIfr"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.instagram.com/yogalifekolkata?utm_source=qr"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://x.com/Shambhu40287904?t=fD_gnGm5cuv5cH4YyLgqxA&s=08"
              icon={BsTwitter}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
