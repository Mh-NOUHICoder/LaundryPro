import React from 'react';
import Link from 'next/link';
import Button from '../components/ui/Button';

const About = () => {
  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50,000+", label: "Loads Washed" },
    { number: "24/7", label: "Customer Support" },
    { number: "4.9/5", label: "Customer Rating" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      description: "Passionate about revolutionizing laundry services",
      image: "👩‍💼"
    },
    {
      name: "Mike Rodriguez",
      role: "Operations Manager",
      description: "Ensuring smooth service delivery",
      image: "👨‍💼"
    },
    {
      name: "Emily Davis",
      role: "Customer Success",
      description: "Dedicated to customer satisfaction",
      image: "👩‍💻"
    },
    {
      name: "James Wilson",
      role: "Laundry Expert",
      description: "20+ years in professional cleaning",
      image: "👨‍🔧"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              LaundryPro
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're on a mission to transform laundry from a chore into a seamless, 
            reliable service that gives you back your valuable time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                LaundryPro was born from a simple idea: what if doing laundry could be 
                effortless? Founded in 2020, we set out to create a service that 
                combines professional cleaning with modern convenience.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we're proud to serve thousands of customers who trust us with 
                their laundry needs. Our commitment to quality, sustainability, and 
                customer satisfaction drives everything we do.
              </p>
              <Link href="/services">
                <Button variant="primary">
                  Explore Our Services
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
              <div className="text-6xl mb-4">🧺</div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100">
                To provide exceptional laundry services that save time, 
                protect your clothes, and care for our environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "💙",
                title: "Quality First",
                description: "We never compromise on the quality of our cleaning and service."
              },
              {
                icon: "🌱",
                title: "Eco-Friendly",
                description: "Using sustainable practices and environmentally friendly products."
              },
              {
                icon: "🚀",
                title: "Innovation",
                description: "Constantly improving our services with technology and feedback."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;