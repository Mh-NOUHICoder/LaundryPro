
import { useApp } from '../context/AppContext'
import { Service } from '../types'

export const useCart = () => {
  const { state, dispatch } = useApp()

  const addToCart = (service: Service, quantity: number = 1) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { service, quantity } 
    })
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'success',
        title: 'Added to cart!',
        message: `${service.name} has been added to your cart.`,
      }
    })
  }

  const removeFromCart = (serviceId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { serviceId } })
  }

  const updateQuantity = (serviceId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { serviceId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return state.cart.items.reduce((total, item) => total + item.totalPrice, 0)
  }

  const getTotalItems = () => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cart: state.cart,
    cartItems: state.cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getTotalItems
  }
}