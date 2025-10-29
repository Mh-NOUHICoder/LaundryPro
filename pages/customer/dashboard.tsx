import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Order, User } from '../../types';
import { getOrders, getUserById } from '../../utils/database';
import OrderCard from '../../components/customer/OrderCard';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/helpers';

interface DashboardProps {
  user: User;
  recentOrders: Order[];
}

export default function CustomerDashboard({ user, recentOrders }: DashboardProps) {
  const router = useRouter();
  const pendingOrders = recentOrders.filter(order => 
    ['pending', 'confirmed', 'picked_up', 'washing', 'ironing', 'ready', 'out_for_delivery'].includes(order.status)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-blue-100 text-lg">
          Ready for your next laundry day? We're here to help!
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/services">
            <Button
              variant="primary"
              className="bg-blue/20 text-blue-700 hover:bg-blue-50 shadow-sm hover:shadow transition-all rounded-xl px-5 py-2.5"
            >
              🧺 Place New Order
            </Button>
          </Link>
          <Link href="/customer/orders">
            <Button
              variant="primary"
              className="bg-transparent border-2 border-white/60 text-white hover:bg-white/10 hover:border-white shadow-sm transition-all rounded-xl px-5 py-2.5"
            >
              📄 View All Orders
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-xl">📦</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{recentOrders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-green-600 text-xl">⏳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(recentOrders.reduce((total, order) => total + order.totalAmount, 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                <Link href="/customer/orders">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.slice(0, 5).map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onViewDetails={(orderId) => {
                        router.push(`/customer/orders/${orderId}`);
                      }}
                      onTrackOrder={(orderId) => {
                        router.push(`/customer/tracking/${orderId}`);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🧺</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Get started by placing your first laundry order!</p>
                  <Link href="/services">
                    <Button variant="primary">
                      Place Your First Order
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/services">
                <Button variant="primary" fullWidth>
                  🧺 Place New Order
                </Button>
              </Link>
              <Link href="/customer/profile">
                <Button variant="outline" fullWidth>
                  👤 Update Profile
                </Button>
              </Link>
              <Link href="/customer/addresses">
                <Button variant="outline" fullWidth>
                  📍 Manage Addresses
                </Button>
              </Link>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Our support team is here to help with any questions about your orders.
            </p>
            <div className="space-y-2 text-sm text-blue-600">
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ support@laundrypro.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // Guard against missing session or user object
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // Extract custom fields with safe casting if you extended the session
  const userId = (session as any).user?.id as string | undefined;
  const role = (session as any).user?.role as string | undefined;

  // Ensure we have a user id to fetch data
  if (!userId) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // Enforce role access
  if (role !== 'customer') {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false,
      },
    };
  }

  try {
    const [user, orders] = await Promise.all([
      getUserById(userId),
      getOrders({ userId })
    ]);

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        recentOrders: JSON.parse(JSON.stringify(orders)),
      },
    };
  } catch (error) {
    console.error('Dashboard error:', error);
    return {
      props: {
        user: null,
        recentOrders: [],
      },
    };
  }
};