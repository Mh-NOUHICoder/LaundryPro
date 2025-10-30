import React, { createContext, useContext, useReducer } from 'react';
import { Service, OrderService, Address } from '../types';

interface CartItem extends OrderService {
  service: Service; // Full service object instead of just ID
}

interface AppState {
  cart: {
    items: CartItem[];
    pickupAddress?: Address;
    deliveryAddress?: Address;
    pickupDate?: string;
    deliveryDate?: string;
    specialInstructions?: string;
  };
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }>;
}

type AppAction = 
  | { type: 'ADD_TO_CART'; payload: { service: Service; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { serviceId: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { serviceId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_PICKUP_ADDRESS'; payload: Address }
  | { type: 'SET_DELIVERY_ADDRESS'; payload: Address }
  | { type: 'SET_PICKUP_DATE'; payload: string }
  | { type: 'SET_DELIVERY_DATE'; payload: string }
  | { type: 'SET_SPECIAL_INSTRUCTIONS'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<AppState['notifications'][0], 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const initialState: AppState = {
  cart: {
    items: [],
  },
  notifications: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { service, quantity } = action.payload;
      const existingItemIndex = state.cart.items.findIndex(
        item => item.service.id === service.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.cart.items];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].totalPrice = 
          updatedItems[existingItemIndex].unitPrice * updatedItems[existingItemIndex].quantity;
        
        return {
          ...state,
          cart: { ...state.cart, items: updatedItems }
        };
      } else {
        const newItem: CartItem = {
          service,
          quantity,
          unitPrice: service.price,
          totalPrice: service.price * quantity,
        };
        
        return {
          ...state,
          cart: { ...state.cart, items: [...state.cart.items, newItem] }
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const filteredItems = state.cart.items.filter(
        item => item.service.id !== action.payload.serviceId
      );
      return {
        ...state,
        cart: { ...state.cart, items: filteredItems }
      };
    }

    case 'UPDATE_CART_QUANTITY': {
      const { serviceId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: { 
            ...state.cart, 
            items: state.cart.items.filter(item => item.service.id !== serviceId) 
          }
        };
      }

      const updatedItems = state.cart.items.map(item => {
        if (item.service.id === serviceId) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity,
          };
        }
        return item;
      });

      return {
        ...state,
        cart: { ...state.cart, items: updatedItems }
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: { items: [] }
      };

    case 'SET_PICKUP_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, pickupAddress: action.payload }
      };

    case 'SET_DELIVERY_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, deliveryAddress: action.payload }
      };

    case 'SET_PICKUP_DATE':
      return {
        ...state,
        cart: { ...state.cart, pickupDate: action.payload }
      };

    case 'SET_DELIVERY_DATE':
      return {
        ...state,
        cart: { ...state.cart, deliveryDate: action.payload }
      };

    case 'SET_SPECIAL_INSTRUCTIONS':
      return {
        ...state,
        cart: { ...state.cart, specialInstructions: action.payload }
      };

    case 'ADD_NOTIFICATION': {
      const notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      };
      return {
        ...state,
        notifications: [...state.notifications, notification]
      };
    }

    case 'REMOVE_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    }

    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};