"use client";

import React, { RefObject } from "react";
import { motion } from "framer-motion";
import { Zap, Shirt, Wallet, DoorOpen, Smartphone, Leaf } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

interface FeaturesSectionProps {
  featuresRef?: RefObject<HTMLElement>;
}

export default function FeaturesSection({ featuresRef }: FeaturesSectionProps) {
  const features: Feature[] = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-100" />,
      title: "Lightning Fast",
      description: "Get your clothes back within 24 hours with our express service.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Shirt className="w-8 h-8 text-blue-100" />,
      title: "Expert Care",
      description: "Professional cleaning with premium, eco-friendly detergents.",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      icon: <Wallet className="w-8 h-8 text-green-100" />,
      title: "No Surprises",
      description: "Transparent pricing with no hidden fees. Really.",
      gradient: "from-green-400 to-green-600",
    },
    {
      icon: <DoorOpen className="w-8 h-8 text-purple-100" />,
      title: "Doorstep Magic",
      description: "We pick up and deliver while you focus on what matters.",
      gradient: "from-purple-400 to-purple-600",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-pink-100" />,
      title: "Track Everything",
      description: "Real-time tracking from pickup to delivery on your phone.",
      gradient: "from-pink-400 to-pink-600",
    },
    {
      icon: <Leaf className="w-8 h-8 text-emerald-100" />,
      title: "Eco-Friendly",
      description: "We care about your clothes and our planet equally.",
      gradient: "from-emerald-400 to-emerald-600",
    },
  ];

  return (
    <section
      ref={featuresRef}
      className="py-20 bg-white/70 backdrop-blur-sm"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🌟 Why We're Different
          </div>

          <h2
            id="features-heading"
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Laundry Made{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Magical
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've turned the chore you hate into a service you'll love.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 cursor-pointer hover:scale-[1.03]"
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-xl mb-4 bg-gradient-to-r ${feature.gradient} shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
