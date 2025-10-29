import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { DashboardStats } from '../../types';
import { getDashboardStats } from '../../utils/database';
import StatsCard from '../../components/admin/StatsCard';
import QuickActions from '../../components/admin/QuickActions';
import { formatCurrency } from '../../utils/helpers';

interface AdminDashboardProps {
  stats: DashboardStats;
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your laundry management portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          change={12}
          changeType="positive"
          icon="📦"
          format="number"
        />
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={8}
          changeType="positive"
          icon="💰"
          format="currency"
        />
        <StatsCard
          title="Active Customers"
          value={stats.activeCustomers}
          change={5}
          changeType="positive"
          icon="👥"
          format="number"
        />
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders}
          change={-3}
          changeType="negative"
          icon="⏳"
          format="number"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Completed Orders This Month</span>
              <span className="font-semibold text-gray-900">{stats.completedOrdersThisMonth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue This Month</span>
              <span className="font-semibold text-green-600">{formatCurrency(stats.revenueThisMonth)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-semibold text-blue-600">{formatCurrency(stats.averageOrderValue)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New order received</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Order #LP-2024-001 delivered</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New customer registered</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Service update completed</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-gray-400 text-4xl mb-2">📊</div>
            <p className="text-gray-500">Revenue chart will be displayed here</p>
            <p className="text-sm text-gray-400 mt-1">Integration with charts library coming soon</p>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">💡 Quick Tip</h4>
          <p className="text-blue-700 text-sm">
            Monitor pending orders regularly to ensure timely service delivery and customer satisfaction.
          </p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <h4 className="text-lg font-semibold text-green-900 mb-2">🚀 Best Practice</h4>
          <p className="text-green-700 text-sm">
            Update order status promptly to keep customers informed about their laundry progress.
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
          <h4 className="text-lg font-semibold text-purple-900 mb-2">📈 Insight</h4>
          <p className="text-purple-700 text-sm">
            Higher average order value indicates customers are using multiple services per order.
          </p>
        </div>
      </div>
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
    const stats = await getDashboardStats();
    return {
      props: {
        stats: JSON.parse(JSON.stringify(stats)),
      },
    };
  } catch (error) {
    console.error('Dashboard error:', error);
    return {
      props: {
        stats: {
          totalOrders: 0,
          totalRevenue: 0,
          activeCustomers: 0,
          pendingOrders: 0,
          completedOrdersThisMonth: 0,
          revenueThisMonth: 0,
          averageOrderValue: 0,
        },
      },
    };
  }
};
