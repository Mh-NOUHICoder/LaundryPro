import React from 'react';
import Link from 'next/link';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Manage Orders',
      description: 'View and update order status',
      href: '/admin/orders',
      icon: '📦',
      color: 'bg-blue-500',
    },
    {
      title: 'Manage Services',
      description: 'Add or edit laundry services',
      href: '/admin/services',
      icon: '🧺',
      color: 'bg-green-500',
    },
    {
      title: 'User Management',
      description: 'Manage customers and staff',
      href: '/admin/users',
      icon: '👥',
      color: 'bg-purple-500',
    },
    {
      title: 'Analytics',
      description: 'View business insights',
      href: '/admin/analytics',
      icon: '📊',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl ${action.color}`}>
                {action.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;