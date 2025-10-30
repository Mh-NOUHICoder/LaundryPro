import { useState, useEffect } from 'react';
import { Order, OrderStatus, ApiResponse } from '../types';

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = userId 
        ? `/api/orders?userId=${userId}`
        : '/api/orders';

      const response = await fetch(url);
      const data: ApiResponse<Order[]> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch orders');
      }

      setOrders(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data: ApiResponse<Order> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update order');
      }

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));

      return data.data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const createOrder = async (orderData: any) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data: ApiResponse<Order> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Add to local state
      if (data.data) {
        setOrders(prev => [data.data!, ...prev]);
      }

      return data.data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Creation failed');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
    updateOrderStatus,
    createOrder,
  };
}