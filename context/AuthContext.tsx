import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User, AuthUser } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === 'loading') {
        dispatch({ type: 'SET_LOADING', payload: true });
        return;
      }

      if (session?.user) {
        try {
          // NextAuth's Session.user may not include `id` by default.
          // Try to use a typed id if available, otherwise fall back to email lookup.
          const userId = (session.user as any)?.id;
          let response: Response;

          if (typeof userId === 'string' && userId.length > 0) {
            response = await fetch(`/api/users/${userId}`);
          } else if (session.user.email) {
            // fallback: fetch by email via query param
            const email = encodeURIComponent(session.user.email);
            response = await fetch(`/api/users?email=${email}`);
          } else {
            dispatch({ type: 'SET_USER', payload: null });
            return;
          }

          if (response.ok) {
            const userData = await response.json();
            dispatch({ type: 'SET_USER', payload: userData });
          } else {
            dispatch({ type: 'SET_USER', payload: null });
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          dispatch({ type: 'SET_USER', payload: null });
        }
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
    };

    fetchUser();
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};