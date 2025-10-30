import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  FaArrowLeft, 
  FaHome, 
  FaRocket, 
  FaSearch,
  FaRegCompass 
} from "react-icons/fa";
import { 
  GiAlienBug, 
  GiUfo 
} from "react-icons/gi";

const Custom404 = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentAlien, setCurrentAlien] = useState(0);

  const aliens = [
    { icon: GiAlienBug, color: "text-green-400" },
    { icon: GiUfo, color: "text-blue-400" },
  ];

  const AlienIcon = aliens[currentAlien].icon;

  const cycleAlien = () => {
    setCurrentAlien((prev) => (prev + 1) % aliens.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:flex-row md:gap-16 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-gray-100 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-blue-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/4 left-20 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-10 right-1/4 w-5 h-5 bg-red-400 rounded-full animate-pulse opacity-50"></div>
      </div>

      {/* Left: Animated Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center relative">
        <div className="relative group">
          {/* Main Image with Enhanced Animation */}
          <Image
            src="/assets/404-scarecrow.png"
            alt="404 Scarecrow"
            width={500}
            height={500}
            className="w-72 md:w-[500px] object-contain drop-shadow-2xl transform transition-all duration-700 animate-float hover:rotate-2"
            priority
          />
          
          {/* Interactive Floating Icons */}
          <button
            onClick={cycleAlien}
            className="absolute top-8 -right-4 bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group-hover:animate-bounce"
          >
            <AlienIcon className={`text-2xl ${aliens[currentAlien].color}`} />
          </button>

          <div className="absolute -bottom-4 left-10 bg-gray-800 p-3 rounded-full shadow-lg animate-pulse">
            <FaSearch className="text-yellow-400 text-xl" />
          </div>

          <div className="absolute top-20 left-4 bg-gray-800 p-3 rounded-full shadow-lg animate-bounce delay-1000">
            <FaRegCompass className="text-red-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Right: Content Section */}
      <div className="mt-10 md:mt-0 md:w-1/2 text-center md:text-left max-w-lg relative z-10">
        {/* Animated Header */}
        <div className="mb-8 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Oops! 
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-2xl text-gray-300">
            <span>Page not found</span>
            <GiAlienBug className="text-green-400 animate-bounce" />
          </div>
        </div>

        {/* Enhanced Description */}
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-300 leading-relaxed">
            Looks like this page took a wrong turn at the 
            <span className="text-yellow-300 font-semibold"> internet crossroads</span> 
            and ended up in the digital wilderness!
          </p>
          
          <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700 transform transition-all duration-300 hover:border-yellow-400/50">
            <p className="text-lg text-center text-gray-300 italic">
              "Even the best explorers get lost sometimes. 
              <span className="block text-yellow-300 mt-1">The important thing is finding your way back!"</span>
            </p>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-4">
          {/* Primary Button with Icon Change */}
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:shadow-3xl overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Back to homepage"
          >
            {/* Animated Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {/* Dynamic Icon */}
            {isHovering ? (
              <FaRocket className="text-white transform transition-all duration-500 group-hover:rotate-45" size="1.2em" />
            ) : (
              <FaHome className="text-white transform transition-all duration-500" size="1.2em" />
            )}
            
            <span className="relative z-10">
              {isHovering ? "Blast Off Home" : "Back to Homepage"}
            </span>
          </Link>

          {/* Secondary Button */}
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FaSearch className="transform transition-transform duration-300 group-hover:rotate-12" />
            Contact Support
          </Link>
        </div>

        {/* Fun Footer */}
        <div className="pt-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <span>🔭</span>
              <span>Still lost?</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🌌</span>
              <span>Try searching from home</span>
            </div>
          </div>
          
          {/* Easter Egg Counter */}
          <div className="mt-4 text-xs text-gray-500 flex items-center justify-center md:justify-start gap-2">
            <span>Alien encounters:</span>
            <button 
              onClick={cycleAlien}
              className="px-2 py-1 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {currentAlien + 1}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
          }
          33% { 
            transform: translateY(-10px) rotate(1deg); 
          }
          66% { 
            transform: translateY(-5px) rotate(-1deg); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Custom404;