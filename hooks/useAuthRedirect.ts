import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useAuthRedirect(requiredRole?: 'customer' | 'admin' | 'staff') {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // Not authenticated, redirect to login
      router.replace('/auth/login');
      return;
    }

    if (requiredRole && session.user.role !== requiredRole) {
      // Wrong role, redirect to appropriate dashboard
      const redirectPath = session.user.role === 'admin' 
        ? '/admin/dashboard' 
        : '/customer/dashboard';
      router.replace(redirectPath);
      return;
    }
  }, [session, status, requiredRole, router]);

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
  };
}