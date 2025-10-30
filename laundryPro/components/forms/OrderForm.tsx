import React from 'react';
import { Service, Address } from '../../types';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/helpers';

interface OrderFormProps {
  services: Service[];
  onSubmit: (orderData: any) => void;
  isLoading?: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ services, onSubmit, isLoading = false }) => {
  const { state, dispatch } = useApp();
  const { cart } = state;

  const calculateTotal = () => {
    const subtotal = cart.items.reduce((total, item) => total + item.totalPrice, 0);
    const tax = subtotal * 0.08;
    const deliveryFee = 5.99;
    return subtotal + tax + deliveryFee;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cart.pickupAddress || !cart.deliveryAddress || !cart.pickupDate || !cart.deliveryDate) {
      alert('Please fill in all required fields');
      return;
    }

    const orderData = {
      services: cart.items.map(item => ({
        serviceId: item.service.id,
        quantity: item.quantity,
        instructions: item.instructions,
      })),
      pickupAddress: cart.pickupAddress,
      deliveryAddress: cart.deliveryAddress,
      pickupDate: cart.pickupDate,
      deliveryDate: cart.deliveryDate,
      specialInstructions: cart.specialInstructions,
      totalAmount: calculateTotal(),
    };

    onSubmit(orderData);
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some services to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            {cart.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{item.service.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} {item.service.unit} × {formatCurrency(item.service.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(item.totalPrice)}</p>
                  <button
                    type="button"
                    onClick={() => dispatch({ 
                      type: 'REMOVE_FROM_CART', 
                      payload: { serviceId: item.service.id } 
                    })}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">
                {formatCurrency(cart.items.reduce((total, item) => total + item.totalPrice, 0))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="text-gray-900">
                {formatCurrency(cart.items.reduce((total, item) => total + item.totalPrice, 0) * 0.08)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">{formatCurrency(5.99)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-blue-600">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
          <textarea
            value={cart.specialInstructions || ''}
            onChange={(e) => dispatch({ type: 'SET_SPECIAL_INSTRUCTIONS', payload: e.target.value })}
            placeholder="Any special instructions for your order..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            disabled={!cart.pickupAddress || !cart.deliveryAddress || !cart.pickupDate || !cart.deliveryDate}
          >
            Place Order - {formatCurrency(calculateTotal())}
          </Button>
          
          {(!cart.pickupAddress || !cart.deliveryAddress || !cart.pickupDate || !cart.deliveryDate) && (
            <p className="text-sm text-red-600 mt-2 text-center">
              Please complete all required fields before placing your order
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
