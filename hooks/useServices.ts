import { useState, useEffect } from 'react';
import { Service, ApiResponse } from '../types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/services');
      const data: ApiResponse<Service[]> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch services');
      }

      setServices(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const createService = async (serviceData: Partial<Service>) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      const data: ApiResponse<Service> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create service');
      }

      // Add to local state
      if (data.data) {
        setServices(prev => [...prev, data.data!]);
      }

      return data.data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Creation failed');
    }
  };

  const updateService = async (serviceId: string, serviceData: Partial<Service>) => {
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      const data: ApiResponse<Service> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update service');
      }

      // Update local state
      if (data.data) {
        setServices(prev => prev.map(service => 
          service.id === serviceId ? data.data! : service
        ));
      }

      return data.data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete service');
      }

      // Remove from local state
      setServices(prev => prev.filter(service => service.id !== serviceId));

      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Deletion failed');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    isLoading,
    error,
    refetch: fetchServices,
    createService,
    updateService,
    deleteService,
  };
}