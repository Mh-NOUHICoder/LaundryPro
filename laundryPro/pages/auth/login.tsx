import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { loginSchema } from '../../utils/validation';
import { useApp } from '../../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();
  const { dispatch } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form data
      loginSchema.parse({ email, password, rememberMe });

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/customer/dashboard',
      });

      if (result?.error) {
        setErrors({ submit: 'Invalid email or password' });
      } else {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'success',
            title: 'Welcome back!',
            message: 'You have successfully signed in.',
          },
        });
        
        // Redirect based on user role or to intended page
        const intendedUrl = router.query.callbackUrl as string || '/customer/dashboard';
        router.push(intendedUrl);
      }
    } catch (error: any) {
      if (error.errors) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{errors.submit}</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              className="rounded-t-md"
              placeholder="Email address"
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              className="rounded-b-md"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Customer:</strong> customer@demo.com / demo123</p>
              <p><strong>Admin:</strong> admin@demo.com / demo123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: session.user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}