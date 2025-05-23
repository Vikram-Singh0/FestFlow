"use client";

import React from "react";
import Image from "next/image";
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section
  id="footer"
  className=""
  crosses
  crossesOffset=""
  customPaddings=""
>
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-n-4 lg:block">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              >
                <Image
                  src={item.iconUrl}
                  alt={item.title}
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
