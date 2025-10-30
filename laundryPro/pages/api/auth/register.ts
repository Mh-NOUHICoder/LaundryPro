import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { name, email, password, phone, role }: RegisterRequest = req.body;

    console.log('Registration attempt for:', email);

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: null,
    });

    // Return user data (without password)
    const user = {
      id: result.insertedId.toString(),
      name,
      email,
      role: role || 'customer',
    };

    console.log('✅ User registered successfully:', user.email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user
    });

  } catch (error: any) {
    console.error('❌ Registration error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again.'
    });
  }
}