"use client";

import Image from "next/image";
import { loading } from "../assets"; // Make sure this is a static importable image or update path accordingly

interface GeneratingProps {
  className?: string;
}

const Generating = ({ className = "" }: GeneratingProps) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] text-base ${className}`}
    >
      <Image src={loading} alt="Loading" width={20} height={20} className="mr-4" />
      Ticket is generating
    </div>
  );
};

export default Generating;
