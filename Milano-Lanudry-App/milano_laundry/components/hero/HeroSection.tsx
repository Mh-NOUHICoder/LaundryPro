import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Truck, Shirt, Clock, ChevronsDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative flex flex-col items-center justify-center text-white font-body
             min-h-[100vh] min-w-full mx-auto my-0 pt-18  pb-20 px-4 
             sm:pt-18 sm:pb-24 sm:px-6 
             lg:pt-24 lg:pb-32 lg:px-8"
      style={{
        backgroundImage: 'url("/assets/images/hero_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginTop: '30px',
      }}
    >
      <div className="absolute inset-0 bg-black/15 bg-opacity-50"></div>

      <div className="max-w-7xl  mx-auto text-center mt-4 relative z-10">
        

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-white/80">
          Laundry Day,
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-300 mt-2">
            Solved
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Premium wash, Fold & Dry cleaning <span className="text-[#E0F7FA]
          ">Delivered To Your Doorstep</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Link href="/auth/register">
          <Button
            size="lg"
            variant="default"
            className="
              bg-black 
              text-white
              hover:bg-cyan-500 
              hover:text-white 
              transform hover:scale-105 
              transition-all duration-300 
              shadow-lg hover:shadow-xl
              rounded-lg
              font-semibold
              px-6 py-3
            "
          >
            SCHEDULE A PICKUP
          </Button>
        </Link>

        </div>

        
      </div>

      <div className="absolute bottom-18 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronsDown size={30} className=" text-gray-300" />
      </div>

    </section>
  );
}

export default HeroSection;