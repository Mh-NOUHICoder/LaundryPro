
import React from 'react';
import Header from './Header';
import { useApp } from '../../context/AppContext';
import Alert from '../ui/Alert';
import { NotificationToast } from '../ui/NotificationToast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state: appState, dispatch } = useApp();

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      

      {/* Notifications */}
      <NotificationToast />

      <main>{children}</main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">LaundryPro</h3>
              <p className="text-gray-600 text-sm">
                Professional laundry services delivered to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Wash & Fold</li>
                <li>Dry Cleaning</li>
                <li>Ironing</li>
                <li>Special Care</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>support@laundrypro.com</li>
                <li>+1 (555) 123-4567</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; 2024 LaundryPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;