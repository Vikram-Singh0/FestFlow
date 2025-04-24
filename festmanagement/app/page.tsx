"use client"
import Image from "next/image";
import { Appbar } from "./components copy/Appbar";
import { Header} from "./components copy/Header"
import  Hero  from "./components copy/Hero"
import  Benefits  from "./components copy/Benefits"
import  Collaboration  from "./components copy/Collaboration"
import ButtonGradient from "./assets/svg/ButtonGradient";
export default function Home() {
  return (
    
      
      <>{/* <Appbar/> */}
      <div className="pt-[4.75rem] lg:pt-[5.25rem] bg-black overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        {/* <Collaboration /> */}
        {/* <Services />
        <Pricing />
        <Roadmap />
        <Footer /> */}
      </div>

      <ButtonGradient />
    </>
    
  );
}
