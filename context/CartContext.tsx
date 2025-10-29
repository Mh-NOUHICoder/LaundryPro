'use client'

import React, { createContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
  image?: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'total'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  showToast: boolean
  showCartToast: () => void
  hideCartToast: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showToast, setShowToast] = useState(false)

  const addToCart = (item: Omit<CartItem, 'total'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { 
                ...cartItem, 
                quantity: cartItem.quantity + item.quantity,
                total: (cartItem.quantity + item.quantity) * cartItem.price
              }
            : cartItem
        )
      }
      
      return [...prev, { ...item, total: item.price * item.quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity, total: item.price * quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const showCartToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000) // Auto hide after 5 seconds
  }

  const hideCartToast = () => {
    setShowToast(false)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.total, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      showToast,
      showCartToast,
      hideCartToast,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  )
}