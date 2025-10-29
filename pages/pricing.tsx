import React from 'react';
import Link from 'next/link';
import Button from '../components/ui/Button';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for occasional laundry needs",
      price: "$1.50",
      unit: "per pound",
      features: [
        "Wash & fold service",
        "24-hour turnaround",
        "Eco-friendly detergents",
        "Free pickup & delivery",
        "Basic stain treatment"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      description: "Best for regular laundry needs",
      price: "$29.99",
      unit: "per month",
      features: [
        "Everything in Starter",
        "15% discount on all services",
        "12-hour express service",
        "Priority scheduling",
        "Advanced stain treatment",
        "Monthly laundry analytics"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Premium",
      description: "Complete laundry care solution",
      price: "$59.99",
      unit: "per month",
      features: [
        "Everything in Professional",
        "25% discount on all services",
        "6-hour express service",
        "Dedicated laundry manager",
        "Premium eco-detergents",
        "Quarterly deep cleaning",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No hidden fees, no surprises. Choose the plan that works best for you.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'border-2 border-blue-500 relative scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.unit}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/auth/register">
                  <Button 
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "Is there a minimum order requirement?",
                answer: "No minimum order required! We serve all customers, whether you have one load or multiple loads."
              },
              {
                question: "How does pickup and delivery work?",
                answer: "We offer free pickup and delivery within our service area. Schedule a time that works for you, and we'll handle the rest."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time without any cancellation fees."
              },
              {
                question: "What are your operating hours?",
                answer: "We're available 7 days a week from 7:00 AM to 10:00 PM for pickups and deliveries."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;