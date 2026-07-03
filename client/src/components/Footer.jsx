import React from "react";

import { Link } from "react-router-dom";

import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";

export default function FooterComponents() {
  return (
    <>
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919546074242?text=Hello!%20I%27d%20like%20to%20inquire%20about%20Yogalife%20Kolkata%27s%20yoga%20classes%20and%20programs."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#AF2226] text-white rounded-full shadow-[0_4px_14px_0_rgba(175,34,38,0.4)] hover:shadow-[0_6px_20px_0_rgba(175,34,38,0.6)] hover:bg-[#901c1f] hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Contact us on WhatsApp"
      >
        <BsWhatsapp className="w-7 h-7" />
        
        {/* Tooltip */}
        <span className="absolute right-16 scale-0 transition-all duration-200 rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white group-hover:scale-100 whitespace-nowrap font-medium pointer-events-none shadow-md">
          Chat with us!
        </span>
      </a>
    </>
  );
}
