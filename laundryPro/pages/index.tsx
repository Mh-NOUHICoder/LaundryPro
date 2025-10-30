import React, { useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Button from '../components/ui/Button';
import { authOptions } from '../lib/auth';

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-float-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
    featureCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-bounce delay-1000"></div>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated Logo/Badge */}
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg animate-bounce-slow">
            <span className="text-2xl text-white">🧺</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Fresh Clothes,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
              Happy Life
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Let us handle the laundry while you enjoy your free time. 
            <span className="text-blue-600 font-semibold"> Professional cleaning</span> delivered to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link href="/auth/register">
              <Button 
                size="xl" 
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ✨ Start Your Free Trial
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                size="xl" 
                variant="outline"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
              >
                🧼 Explore Services
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center animate-fade-in delay-500">
            {['⭐ 4.9/5 Stars', '🚚 2,000+ Happy Customers', '🏠 Doorstep Service'].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                <span className="text-sm font-medium text-gray-700">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Animation */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🌟 Why We're Different
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Laundry Made
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Magical</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've turned the chore you hate into a service you'll love
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Get your clothes back within 24 hours with our express service.',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: '👔',
                title: 'Expert Care',
                description: 'Professional cleaning with premium, eco-friendly detergents.',
                color: 'from-blue-400 to-blue-600'
              },
              {
                icon: '💰',
                title: 'No Surprises',
                description: 'Transparent pricing with no hidden fees. Really.',
                color: 'from-green-400 to-green-600'
              },
              {
                icon: '🚪',
                title: 'Doorstep Magic',
                description: 'We pick up and deliver while you focus on what matters.',
                color: 'from-purple-400 to-purple-600'
              },
              {
                icon: '📱',
                title: 'Track Everything',
                description: 'Real-time tracking from pickup to delivery on your phone.',
                color: 'from-pink-400 to-pink-600'
              },
              {
                icon: '🌱',
                title: 'Eco-Friendly',
                description: 'We care about your clothes and our planet equally.',
                color: 'from-emerald-400 to-emerald-600'
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="feature-card opacity-0 transform translate-y-10 transition-all duration-500 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 group cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Getting started is as easy as 1-2-3
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Schedule Pickup', desc: 'Book online in 60 seconds', icon: '📅' },
              { step: '2', title: 'We Clean & Care', desc: 'Expert cleaning with love', icon: '🧴' },
              { step: '3', title: 'Fresh Delivery', desc: 'Delivered to your doorstep', icon: '🎁' },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 animate-pulse">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-blue-100 text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-300 rounded-full animate-pulse"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Magic Laundry?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who've transformed their laundry routine
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button 
                size="xl" 
                variant="primary"
                className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                🎉 Start Free Trial Today
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="xl" 
                variant="ghost" 
                className="bg border-2 border-white text-white hover:bg-white/10"
              >
                💬 Learn More
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-400 mt-6">
            No credit card required • Free pickup & delivery • Cancel anytime
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animate-fade-in-up.delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animate-fade-in.delay-500 {
          animation: fadeInUp 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }

        .animate-float-in {
          animation: floatIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const redirectUrl = (session.user as any).role === 'admin'
      ? '/admin/dashboard'
      : '/customer/dashboard';
    
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};