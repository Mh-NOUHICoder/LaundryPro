import React from 'react';
import { Address } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface AddressFormProps {
  address?: Partial<Address>;
  onSubmit: (address: Address) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState({
    label: address?.label || '',
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    country: address?.country || 'United States',
    isDefault: address?.isDefault || false,
    instructions: address?.instructions || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Address);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Address Label"
        value={formData.label}
        onChange={(e) => handleChange('label', e.target.value)}
        placeholder="Home, Office, etc."
        required
      />

      <Input
        label="Street Address"
        value={formData.street}
        onChange={(e) => handleChange('street', e.target.value)}
        placeholder="123 Main St"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="New York"
          required
        />

        <Input
          label="State"
          value={formData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          placeholder="NY"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="ZIP Code"
          value={formData.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          placeholder="10001"
          required
        />

        <Input
          label="Country"
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          required
        />
      </div>

      <Input
        label="Delivery Instructions (Optional)"
        value={formData.instructions}
        onChange={(e) => handleChange('instructions', e.target.value)}
        placeholder="Gate code, floor number, etc."
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => handleChange('isDefault', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
          Set as default address
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {address ? 'Update Address' : 'Add Address'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;