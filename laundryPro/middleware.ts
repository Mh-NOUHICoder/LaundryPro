import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isCustomerRoute = req.nextUrl.pathname.startsWith('/customer');
    const isApiRoute = req.nextUrl.pathname.startsWith('/api');

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      const redirectUrl = token?.role === 'admin' 
        ? '/admin/dashboard' 
        : '/customer/dashboard';
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // Protect admin routes
    if (isAdminRoute && isAuth && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/customer/dashboard', req.url));
    }

    // Protect customer routes
    if (isCustomerRoute && isAuth && token?.role !== 'customer') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    // Redirect unauthenticated users to login
    if (!isAuth && (isAdminRoute || isCustomerRoute)) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodeURIComponent(from)}`, req.url)
      );
    }

    // API route protection
    if (isApiRoute) {
      // Add CORS headers for API routes
      const response = NextResponse.next();
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return response;
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // This is a workaround to handle redirects properly
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/customer/:path*',
    '/auth/:path*',
    '/api/:path*',
  ],
};