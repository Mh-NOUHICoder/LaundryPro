import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Service, ServiceCategory } from '../../types';
import { getServices } from '../../utils/database';
import ServiceCard from '../../components/customer/ServiceCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { useApp } from '../../context/AppContext';

interface ServicesPageProps {
  services: Service[];
  error?: string;
  debugInfo?: any;
}

export default function ServicesPage({ services, error, debugInfo }: ServicesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { state } = useApp();
  const cartItemCount = state.cart.items.reduce((total, item) => total + item.quantity, 0);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory && service.isActive;
  });

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'wash-fold', label: 'Wash & Fold' },
    { value: 'dry-clean', label: 'Dry Cleaning' },
    { value: 'ironing', label: 'Ironing' },
    { value: 'special', label: 'Special Care' },
    { value: 'stain-removal', label: 'Stain Removal' },
    { value: 'premium', label: 'Premium' },
  ];

  const openServiceDetails = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Debug Information - Remove this section once fixed */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Debug Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Services Count:</strong> {services.length}
          </div>
          <div>
            <strong>Filtered Count:</strong> {filteredServices.length}
          </div>
          <div>
            <strong>Current Filter:</strong> {categoryFilter}
          </div>
          <div className="md:col-span-3">
            <strong>Available Categories:</strong> {services.length > 0 
              ? [...new Set(services.map(s => s.category))].join(', ')
              : 'No services found'
            }
          </div>
          {error && (
            <div className="md:col-span-3 text-red-600">
              <strong>Error:</strong> {error}
            </div>
          )}
          {debugInfo && (
            <div className="md:col-span-3">
              <strong>Debug Info:</strong> <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">LaundryPro Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fast, reliable, and professional laundry care. Find your service, add to cart, and relax!
        </p>
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          variant="primary"
          className="shadow-lg text-lg px-6 py-3"
          onClick={() => window.location.href = '/customer/cart'}
          disabled={cartItemCount === 0}
        >
          🛒 Cart ({cartItemCount})
        </Button>
      </div>

      {/* Show error state if no services */}
      {services.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Services Available</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {error 
              ? `There was an error loading services: ${error}`
              : 'No services are currently available in the database.'
            }
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Check your database connection and make sure services are added.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Retry Loading Services
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-10 flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
            <div className="flex-1">
              <Input
                label="Search Services"
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ServiceCategory | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onViewDetails={openServiceDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No services found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your search or filters.'
                  : 'No services available. Please check back soon.'
                }
              </p>
              {(searchTerm || categoryFilter !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                  variant="primary"
                >
                  Show All
                </Button>
              )}
            </div>
          )}

          {/* Service Details Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedService?.name || 'Service Details'}
            size="lg"
          >
            {selectedService && (
              <div className="space-y-6">
                <div className="bg-gray-100 rounded-lg p-4">
                  <img
                    src={selectedService.image}
                    alt={selectedService.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Price</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      ${selectedService.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Estimated Time</h4>
                    <p className="text-gray-600">{selectedService.estimatedTime}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>
                {selectedService.features && selectedService.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {selectedService.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Service Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                      <span className="font-medium">Category:</span>{' '}
                      {selectedService.category.replace('-', ' ')}
                    </div>
                    <div>
                      <span className="font-medium">Minimum Order:</span>{' '}
                      {selectedService.minimumOrder} {selectedService.unit}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {/* CTA Section */}
          <div className="mt-16 flex justify-center">
            <div className="relative bg-white rounded-3xl shadow-2xl px-10 py-12 text-center max-w-xl w-full border border-blue-100">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 shadow-lg">
                  <span className="text-white text-4xl">🧺</span>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-blue-700 mt-8 mb-4">Ready to Get Started?</h2>
              <p className="text-blue-500 mb-8 max-w-md mx-auto text-lg">
                Add your preferred services to the cart and schedule your laundry pickup. Let us handle the rest!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg px-6 py-3 shadow-md hover:scale-105 transition-transform"
                  onClick={() => window.location.href = '/customer/cart'}
                  disabled={cartItemCount === 0}
                >
                  Proceed to Cart ({cartItemCount})
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-lg px-6 py-3"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Browse More Services
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    console.log('🔍 Fetching services from database...');
    const services = await getServices();
    
    // Debug: Log what we got from the database
    console.log('📦 Services fetched:', services?.length || 0);
    if (services && services.length > 0) {
      console.log('📋 Sample service:', services[0]);
      console.log('🏷️ All categories:', [...new Set(services.map(s => s.category))]);
    } else {
      console.log('❌ No services found in database');
    }
    
    return {
      props: {
        services: JSON.parse(JSON.stringify(services || [])),
      },
    };
  } catch (error) {
    console.error('❌ Services page error:', error);
    return {
      props: {
        services: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        debugInfo: {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString(),
        }
      },
    };
  }
}