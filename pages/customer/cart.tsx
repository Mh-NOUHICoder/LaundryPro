
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';
import OrderForm from '../../components/forms/OrderForm';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getTotalItems } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (showOrderForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => setShowOrderForm(false)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
          >
            ← Back to Cart
          </button>
          <OrderForm 
            services={cartItems.map(item => item.service)}
            onSubmit={() => {
              clearCart()
              // OrderForm handles redirect
            }}
          />
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add some laundry services to get started with fresh, clean clothes!
            </p>
            <Link 
              href="/customer/services"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img 
                      src={item.service.image} 
                      alt={item.service.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {item.service.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.service.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-blue-600 font-semibold">
                          ${item.unitPrice} each
                        </span>
                        <span className="text-gray-500">
                          Total: <span className="font-semibold text-gray-900">${item.totalPrice}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.service.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            {/* Line Items */}
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.service.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.service.name} 
                    <span className="text-gray-400 ml-1">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-900">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Proceed to Order Details
              </button>
              <Link 
                href="/customer/services"
                className="block w-full text-center border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear your cart?')) {
                    clearCart()
                  }
                }}
                className="w-full text-red-600 py-2 text-sm hover:text-red-700 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

