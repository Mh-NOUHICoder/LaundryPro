"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Gift,
  HandHeart,
  Truck, // Added
  Shirt, // Added
  Clock, // Added
} from "lucide-react";

// Interface for the main steps
interface Step {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactElement;
}

// Interface for the new feature list
interface Feature {
  label: string;
  icon: React.ReactElement;
}

export default function HowItWorksSection(): React.ReactElement {
  // Main 3-step process
  const steps: Step[] = [
    {
      step: "1",
      title: "Schedule Pickup",
      desc: "Book online in 60 seconds",
      icon: (
        <Calendar
          className="w-10 h-10 text-blue-500"
          aria-hidden="true"
        />
      ),
    },
    {
      step: "2",
      title: "We Clean & Care",
      desc: "Expert cleaning with love",
      icon: (
        <HandHeart
          className="w-10 h-10 text-green-500"
          aria-hidden="true"
        />
      ),
    },
    {
      step: "3",
      title: "Fresh Delivery",
      desc: "Delivered to your doorstep",
      icon: (
        <Gift className="w-10 h-10 text-purple-500" aria-hidden="true" />
      ),
    },
  ];

  // New feature list from your snippet
  const features: Feature[] = [
    {
      icon: (
        <Truck
          className="w-6 h-8 text-muted-foreground"
          aria-hidden="true"
        />
      ),
      label: "Free Pickup & Delivery",
    },
    {
      icon: (
        <Shirt
          className="w-6 h-8 text-muted-foreground"
          aria-hidden="true"
        />
      ),
      label: "Expert Care",
    },
    {
      icon: (
        <Clock
          className="w-6 h-8 text-muted-foreground"
          aria-hidden="true"
        />
      ),
      label: "Fast Turnaround",
    },
  ];

  return (
    <section
      className="py-20 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100"
      aria-labelledby="howitworks-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h2
            id="howitworks-heading"
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            How It Works
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Getting started is as easy as 1-2-3
          </p>
        </div>

        {/* --- NEWLY ADDED FEATURE SECTION --- */}
        <motion.div
          className="mb-16 flex flex-wrap justify-center gap-8 items-start text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 transition-transform hover:scale-105 shrink-0 w-40" // Added w-40 for better wrapping
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full border border-border bg-white dark:bg-slate-800">
                {item.icon}
              </div>
              <div className="flex flex-col items-center text-sm text-muted-foreground">
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
        {/* --- END OF NEW SECTION --- */}

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((stepItem, index) => (
            <motion.div
              key={`how-step-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }} // Delayed to animate after features
              className="relative flex flex-col items-center text-center bg-white dark:bg-slate-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="w-20 h-20 flex items-center justify-center rounded-full  text-white mb-4 shadow-lg transform transition-transform duration-300"
                role="img"
                aria-hidden={true}
              >
                {stepItem.icon}
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-lg">
                {stepItem.step}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {stepItem.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {stepItem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}