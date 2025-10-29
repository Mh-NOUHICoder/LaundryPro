import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

interface TestResult {
  success: boolean;
  message: string;
  timestamp?: string;
  error?: string;
  details?: {
    database?: string;
    collections?: string[];
    connectionInfo?: string;
    cluster?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResult>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    console.log('Testing MongoDB Atlas connection...');
    
    const client = await clientPromise;
    const db = client.db();
    
    // Test connection with ping
    const pingResult = await db.command({ ping: 1 });
    
    // Get database info
    const databaseName = db.databaseName;
    
    // List collections
    let collections: string[] = [];
    try {
      const collectionsList = await db.listCollections().toArray();
      collections = collectionsList.map(col => col.name);
    } catch (error) {
      console.log('Could not list collections');
    }

    console.log('✅ MongoDB Atlas connection successful');
    
    res.status(200).json({
      success: true,
      message: 'MongoDB Atlas connected successfully',
      timestamp: new Date().toISOString(),
      details: {
        database: databaseName,
        collections: collections,
        connectionInfo: 'MongoDB Atlas Cluster',
        cluster: 'mhcoder.c76yrez.mongodb.net'
      }
    });

  } catch (error: any) {
    console.error('❌ MongoDB Atlas connection failed:', error);
    
    // More specific error messages for Atlas
    let errorMessage = error.message;
    let connectionInfo = 'Unknown error';
    
    if (errorMessage.includes('ECONNREFUSED')) {
      connectionInfo = 'Cannot connect to MongoDB Atlas. Check your network connection and IP whitelist.';
    } else if (errorMessage.includes('authentication failed')) {
      connectionInfo = 'Authentication failed. Check your username and password in MONGODB_URI.';
    } else if (errorMessage.includes('ENOTFOUND')) {
      connectionInfo = 'Cannot reach MongoDB Atlas cluster. Check your connection string.';
    } else if (errorMessage.includes('bad auth') || errorMessage.includes('AuthenticationFailed')) {
      connectionInfo = 'Invalid credentials. Please check your username and password.';
    }
    
    res.status(500).json({
      success: false,
      message: 'MongoDB Atlas connection failed',
      timestamp: new Date().toISOString(),
      error: errorMessage,
      details: {
        connectionInfo: connectionInfo
      }
    });
  }
};