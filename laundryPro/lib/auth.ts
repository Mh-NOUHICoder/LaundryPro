import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb';
import bcrypt from 'bcryptjs';
import type { AuthUser } from '../types';
import type { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  // Use the MongoDBAdapter with the shared clientPromise (singleton)
  // Narrow type to NextAuth's Adapter to resolve @auth/core vs next-auth type mismatch
  adapter: MongoDBAdapter(clientPromise) as unknown as Adapter,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // Generic message to avoid user enumeration
          throw new Error('Invalid credentials');
        }

        try {
          const client = await clientPromise;
          const db = client.db();

          const user = await db.collection('users').findOne({
            email: credentials.email.toLowerCase(),
          });

          // Use a single generic error branch for all failures
          if (!user || !user.password) {
            throw new Error('Invalid credentials');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user._id.toString(),
            email: String(user.email).toLowerCase(),
            name: user.name,
            role: user.role,
          } as AuthUser;
        } catch (error) {
          // Avoid logging sensitive details in production
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error('Authorization error');
          }
          // Rethrow a generic error for NextAuth to handle via pages.error
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as AuthUser).role;
        token.id = (user as any).id;
      }

      // Whitelist fields when updating the token to prevent pollution
      if (trigger === 'update' && session?.user) {
        const allowed: Partial<Record<string, unknown>> = {};
        if (typeof session.user.name === 'string') allowed['name'] = session.user.name;
        if (typeof session.user.image === 'string') allowed['image'] = session.user.image;
        token = { ...token, ...allowed };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Casts remain until NextAuth module augmentation is added
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};