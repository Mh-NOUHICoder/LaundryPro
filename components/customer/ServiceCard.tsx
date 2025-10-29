import React, { useState, useRef } from 'react';
import { Service } from '../../types';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ServiceCardProps {
  service: Service;
  onViewDetails?: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { addToCart, getTotalItems } = useCart();
  
  // Use useRef for timeout instead of window property
  const hideToastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = () => {
    addToCart(service, quantity);
    setShowQuickActions(true);
    
    // Clear any existing timeout
    if (hideToastTimeoutRef.current) {
      clearTimeout(hideToastTimeoutRef.current);
    }
    
    // Set 10-second timeout
    hideToastTimeoutRef.current = setTimeout(() => {
      setShowQuickActions(false);
    }, 10000); // 10 seconds
    
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <img
          src={service.image || '/assets/images/maria-lin-kim-qOXoIfd7IC0-unsplash.jpg'}
          alt={service.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            // Prevent infinite retry loop
            if (target.dataset.fallback) return;

            // If the image path uses `/images/` but files live under `/assets/images/`, try that first
            try {
              const src = target.getAttribute('src') || '';
              if (src.startsWith('/images/')) {
                const basename = src.split('/').pop();
                if (basename) {
                  target.dataset.fallback = 'true';
                  target.src = `/assets/images/${basename}`;
                  return;
                }
              }
            } catch (err) {
              // ignore and fallback to generic image
            }

            // Generic fallback
            target.dataset.fallback = 'true';
            target.src = '/assets/images/wash-fold.jpg';
          }}
        />
        {!service.isActive && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded-full text-sm">
              Unavailable
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
          <span className="text-2xl font-bold text-blue-600">
            ${service.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>⏱️ {service.estimatedTime}</span>
          <span>📦 Min: {service.minimumOrder} {service.unit}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20"
              disabled={!service.isActive}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={!service.isActive || showQuickActions}
              fullWidth
            >
              {showQuickActions ? '✓ Added!' : 'Add to Cart'}
            </Button>
            {onViewDetails && (
              <Button
                variant="outline"
                onClick={() => onViewDetails(service)}
                fullWidth
              >
                Details
              </Button>
            )}
          </div>
          {/* Quick Actions Popup */}
          {showQuickActions && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-2xl p-4 z-50 shadow-2xl max-w-sm w-full mx-4 animate-in slide-in-from-bottom-8 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Added to cart</p>
                    <p className="text-gray-400 text-xs">{getTotalItems()} items</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowQuickActions(false)}
                    className="text-gray-400 hover:text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href="/customer/cart"
                    className="bg-white text-gray-900 text-sm font-medium px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setShowQuickActions(false)}
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;