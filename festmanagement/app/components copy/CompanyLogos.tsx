"use client";

import Image from "next/image";
import { companyLogos } from "../constants";

interface CompanyLogosProps {
  className?: string;
}

const CompanyLogos = ({ className }: CompanyLogosProps) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create secure ticket at
      </h5>
      <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center h-[6rem] w-[8rem]"
            key={index}
          >
            <Image
              src={logo.src}
              width={134}
              height={28}
              alt={`${logo.name} logo`}
              className="object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
