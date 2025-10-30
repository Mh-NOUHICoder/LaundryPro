import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Order, OrderStatus } from '../../../types';
import { formatCurrency, formatDate, getOrderStatusColor } from '../../../utils/helpers';
import Button from '../../../components/ui/Button';

interface OrderTrackingProps {
  order: Order;
}

const ORDER_STATUS_STEPS: { status: OrderStatus; label: string; description: string }[] = [
  { status: 'pending', label: 'Order Placed', description: 'Your order has been received' },
  { status: 'confirmed', label: 'Confirmed', description: 'Order confirmed and scheduled' },
  { status: 'picked_up', label: 'Picked Up', description: 'Items collected from your location' },
  { status: 'washing', label: 'Washing', description: 'Items are being cleaned' },
  { status: 'ironing', label: 'Ironing', description: 'Items are being pressed' },
  { status: 'ready', label: 'Ready', description: 'Order is ready for delivery' },
  { status: 'out_for_delivery', label: 'Out for Delivery', description: 'On the way to you' },
  { status: 'delivered', label: 'Delivered', description: 'Order delivered successfully' },
];

export default function OrderTracking({ order }: OrderTrackingProps) {
  const router = useRouter();
  
  const currentStepIndex = ORDER_STATUS_STEPS.findIndex(step => step.status === order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
        <p className="text-gray-600">Tracking order #{order.orderNumber}</p>
      </div>

      {/* Order Status Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
            <p className="text-gray-600">Last updated: {formatDate(order.updatedAt)}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.status)}`}>
            {order.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {isCancelled ? (
          <div className="text-center py-8">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Cancelled</h3>
            <p className="text-gray-600 mb-4">
              {order.cancellationReason || 'This order has been cancelled.'}
            </p>
            <Button
              variant="primary"
              onClick={() => router.push('/customer/services')}
            >
              Place New Order
            </Button>
          </div>
        ) : (
          /* Progress Steps */
          <div className="relative">
            {ORDER_STATUS_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isUpcoming = index > currentStepIndex;

              return (
                <div key={step.status} className="flex items-start mb-8 last:mb-0">
                  {/* Step Indicator */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10
                    ${isCompleted ? 'bg-green-500 text-white' : 
                      isCurrent ? 'bg-blue-500 text-white' : 
                      'bg-gray-300 text-gray-500'}">
                    {isCompleted ? '✓' : index + 1}
                  </div>

                  {/* Step Content */}
                  <div className="ml-4 flex-1">
                    <h3 className={`font-semibold ${
                      isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  </div>

                  {/* Connecting Line */}
                  {index < ORDER_STATUS_STEPS.length - 1 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-12 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} style={{ marginLeft: '14px' }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">#{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date</span>
              <span className="font-medium">{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pickup Date</span>
              <span className="font-medium">{formatDate(order.pickupDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Date</span>
              <span className="font-medium">{formatDate(order.deliveryDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-blue-600">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
          <div className="space-y-3">
            {order.services.map((service, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">
                    {typeof service.service === 'object' ? service.service.name : 'Service'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {service.quantity}
                  </p>
                </div>
                <p className="font-medium text-gray-900">
                  {formatCurrency(service.totalPrice)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup Address</h3>
          <div className="text-gray-600">
            <p className="font-medium">{order.pickupAddress.street}</p>
            <p>{order.pickupAddress.city}, {order.pickupAddress.state} {order.pickupAddress.zipCode}</p>
            {order.pickupAddress.instructions && (
              <p className="mt-2 text-sm">Instructions: {order.pickupAddress.instructions}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
          <div className="text-gray-600">
            <p className="font-medium">{order.deliveryAddress.street}</p>
            <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
            {order.deliveryAddress.instructions && (
              <p className="mt-2 text-sm">Instructions: {order.deliveryAddress.instructions}</p>
            )}
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      {order.specialInstructions && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
          <p className="text-gray-600">{order.specialInstructions}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={() => router.push('/customer/orders')}
        >
          Back to Orders
        </Button>
        <Button
          variant="primary"
          onClick={() => router.push('/customer/services')}
        >
          Place New Order
        </Button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { orderId } = context.params!;

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
      headers: {
        Cookie: context.req.headers.cookie || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    const data = await response.json();

    // Check if the order belongs to the current user
    if (session.user.role === 'customer' && data.data.userId !== session.user.id) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        order: data.data,
      },
    };
  } catch (error) {
    console.error('Order tracking error:', error);
    return {
      notFound: true,
    };
  }
}