import React from "react";
import {
   Footer,
   FooterLink,
   FooterLinkGroup,
   FooterTitle,
} from "flowbite-react";

import footerlogo from "../assets/footerlogo.svg";
import { Link } from "react-router-dom";
export const FooterSection = () => {
   return (
      <Footer className="bg-[#030409] text-[#EAEAEA]">
         <div className="w-full ">
            <div className="grid w-full grid-cols-2  sm:mx-auto px-3 sm:px-19 py-8 md:grid-cols-4">
               <div className="mx-4">
                  <FooterTitle
                     className="text-[#F0CB52] leading-[100px]"
                     title="Quick Links"
                  />
                  <FooterLinkGroup col>
                     <FooterLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault();
                           document
                              .getElementById("papu-ai-works")
                              ?.scrollIntoView({
                                 behavior: "smooth",
                                 block: "start",
                              });
                        }}
                     >
                        How It Works
                     </FooterLink>
                     <FooterLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault();
                           document
                              .getElementById("use-cases")
                              ?.scrollIntoView({
                                 behavior: "smooth",
                                 block: "start",
                              });
                        }}
                     >
                        Use Cases
                     </FooterLink>
                     <FooterLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault();
                           document.getElementById("features")?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                           });
                        }}
                     >
                        Features
                     </FooterLink>
                     <Link to="/terms-and-services">
                        <FooterLink>Terms of Service</FooterLink>
                     </Link>
                  </FooterLinkGroup>
               </div>
               <div>
                  <FooterLinkGroup col className="mt-[120px] leading-[20px]">
                     <FooterLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault();
                           document
                              .getElementById("testimonials")
                              ?.scrollIntoView({
                                 behavior: "smooth",
                                 block: "start",
                              });
                        }}
                     >
                        Tetsimonials
                     </FooterLink>
                     <FooterLink href="#">Pricing</FooterLink>
                     <FooterLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault();
                           document.getElementById("faqs")?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                           });
                        }}
                     >
                        FAQs
                     </FooterLink>
                     <Link to="/privacy-policy">
                        <FooterLink>Privacy Policy</FooterLink>
                     </Link>
                  </FooterLinkGroup>
               </div>
               <div>
                  <FooterTitle
                     className="leading-[90px] mx-4 mt-2 text-[#F0CB52]"
                     title="Social"
                  />
                  <FooterLinkGroup className="mx-4" col>
                     <FooterLink href="#">LinkedIn</FooterLink>
                     <FooterLink href="#">X.com</FooterLink>
                     <FooterLink href="#">Facebook</FooterLink>
                  </FooterLinkGroup>
               </div>
               <div>
                  <FooterTitle
                     className="leading-[80px] mt-2 text-[#F0CB52]"
                     title="Contact"
                  />
                  <FooterLinkGroup col>
                     <FooterLink href="#">Email: ali@veracious.ai</FooterLink>
                     <FooterLink href="#">
                        Level 1, Devonshire House, One Mayfair Place, London, UK
                     </FooterLink>
                     <FooterLink href="#">Copyright 2025 | Papu AI</FooterLink>
                  </FooterLinkGroup>
               </div>
            </div>
            <div className="py-5 flex justify-center">
               <Link
                  href="/"
                  onClick={(e) => {
                     e.preventDefault();
                     document.getElementById("/")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                     });
                  }}
               >
                  <img
                     src={footerlogo}
                     className="fill-[#4b4c51]"
                     alt="footer logo"
                  />
               </Link>
            </div>
         </div>
      </Footer>
   );
};
