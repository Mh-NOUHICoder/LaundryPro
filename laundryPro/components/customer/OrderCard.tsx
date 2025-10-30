import React from 'react';
import { Order } from '../../types';
import { formatCurrency, formatDate, getOrderStatusColor } from '../../utils/helpers';
import Button from '../ui/Button';

interface OrderCardProps {
  order: Order;
  onViewDetails?: (orderId: string) => void;
  onTrackOrder?: (orderId: string) => void;
  showActions?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onViewDetails, 
  onTrackOrder,
  showActions = true 
}) => {
  const statusColor = getOrderStatusColor(order.status);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order #{order.orderNumber}
          </h3>
          <p className="text-gray-500 text-sm">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {order.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Total Amount</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(order.totalAmount)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Pickup Date</p>
          <p className="text-gray-900">{formatDate(order.pickupDate)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Delivery Date</p>
          <p className="text-gray-900">{formatDate(order.deliveryDate)}</p>
        </div>
      </div>

      {order.specialInstructions && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Special Instructions</p>
          <p className="text-gray-600 text-sm">{order.specialInstructions}</p>
        </div>
      )}

      {showActions && (
        <div className="flex space-x-3">
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(order.id)}
            >
              View Details
            </Button>
          )}
          {onTrackOrder && order.status !== 'delivered' && order.status !== 'cancelled' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onTrackOrder(order.id)}
            >
              Track Order
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;