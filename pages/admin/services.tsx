import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Service } from '../../types';
import { getServices } from '../../utils/database';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ServiceForm from '../../components/forms/ServiceForm';

interface AdminServicesProps {
  services: Service[];
}

export default function AdminServices({ services }: AdminServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleServiceStatus = async (service: Service) => {
    try {
      const response = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...service,
          isActive: !service.isActive,
        }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to update service status');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600 mt-2">Manage your laundry services and pricing</p>
        </div>
        <Button
          variant="primary"
          onClick={handleCreateService}
        >
          Add New Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              {!service.isActive && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded-full text-sm">
                    Inactive
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(service.price)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>⏱️ {service.estimatedTime}</span>
                <span className="capitalize">{service.category.replace('-', ' ')}</span>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditService(service)}
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  variant={service.isActive ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => toggleServiceStatus(service)}
                  fullWidth
                >
                  {service.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteService(service.id)}
                  disabled={isDeleting}
                  fullWidth
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-400 text-6xl mb-4">🧺</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first service!</p>
          <Button
            onClick={handleCreateService}
            variant="primary"
          >
            Create First Service
          </Button>
        </div>
      )}

      {/* Service Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Create New Service'}
        size="lg"
      >
        <ServiceForm
          service={editingService || undefined}
          onSuccess={() => {
            setIsModalOpen(false);
            window.location.reload();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const services = await getServices();
    return {
      props: {
        services: JSON.parse(JSON.stringify(services)),
      },
    };
  } catch (error) {
    console.error('Admin services error:', error);
    return {
      props: {
        services: [],
      },
    };
  }
};
