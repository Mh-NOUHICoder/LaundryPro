'use client'

import { useRouter } from 'next/navigation'

interface CartToastProps {
  onClose: () => void
}

export const CartToast: React.FC<CartToastProps> = ({ onClose }) => {
  const router = useRouter()

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Item added to cart!</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => {
                router.push('/customer/cart')
                onClose()
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Go to Cart
            </button>
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}