import React, { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '../../types';
import { serviceSchema } from '../../utils/validation';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ServiceFormProps {
  service?: Service;
  onSuccess: () => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'wash-fold' as ServiceCategory,
    image: '',
    estimatedTime: '',
    minimumOrder: 1,
    unit: 'per item',
    features: [''],
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
        category: service.category,
        image: service.image,
        estimatedTime: service.estimatedTime,
        minimumOrder: service.minimumOrder,
        unit: service.unit,
        features: service.features,
        isActive: service.isActive,
      });
    }
  }, [service]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form data
      serviceSchema.parse(formData);

      const url = service 
        ? `/api/services/${service.id}`
        : '/api/services';

      const method = service ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save service');
      }

      onSuccess();
    } catch (error: any) {
      if (error.errors) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ submit: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{errors.submit}</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Service Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
        />

        <Input
          label="Price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => handleChange('price', parseFloat(e.target.value))}
          error={errors.price}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="wash-fold">Wash & Fold</option>
          <option value="dry-clean">Dry Cleaning</option>
          <option value="ironing">Ironing</option>
          <option value="special">Special Care</option>
          <option value="stain-removal">Stain Removal</option>
          <option value="premium">Premium Service</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        error={errors.description}
        required
      />

      <Input
        label="Image URL"
        value={formData.image}
        onChange={(e) => handleChange('image', e.target.value)}
        error={errors.image}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Estimated Time"
          value={formData.estimatedTime}
          onChange={(e) => handleChange('estimatedTime', e.target.value)}
          placeholder="e.g., 24-48 hours"
          error={errors.estimatedTime}
          required
        />

        <Input
          label="Minimum Order"
          type="number"
          value={formData.minimumOrder}
          onChange={(e) => handleChange('minimumOrder', parseInt(e.target.value))}
          error={errors.minimumOrder}
          required
        />

        <Input
          label="Unit"
          value={formData.unit}
          onChange={(e) => handleChange('unit', e.target.value)}
          placeholder="e.g., per item, per kg"
          error={errors.unit}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Features
        </label>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Add a feature..."
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addFeature}>
            Add Feature
          </Button>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => handleChange('isActive', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          Service is active and available to customers
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {service ? 'Update Service' : 'Create Service'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;