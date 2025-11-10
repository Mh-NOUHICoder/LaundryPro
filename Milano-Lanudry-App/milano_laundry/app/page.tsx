import Image from "next/image";
import HeroSection from "@/components/hero/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";


export default function Home() {
  return (
    <>
     <HeroSection />
     <FeaturesSection/>
     <HowItWorksSection/>
    </>

  );
}
