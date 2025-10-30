import clientPromise from '../lib/mongodb';
import { ObjectId, Document } from 'mongodb';
import { 
  User, 
  Order, 
  Service, 
  DashboardStats, 
  OrderStatus,
  OrderFilter 
} from '../types';

// Helper function to transform MongoDB document
function transformDocument<T extends { id: string }>(doc: Document): T {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString()
  } as T;
}

// Error handler wrapper
async function handleDbOperation<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}

export async function getUsers(): Promise<User[]> {
  return handleDbOperation(async () => {
    const client = await clientPromise;
    const db = client.db();
    
    const users = await db
      .collection('users')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return users.map(user => transformDocument<User>(user));
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return handleDbOperation(async () => {
    const client = await clientPromise;
    const db = client.db();
    
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
      
    if (!user) return null;
    
    return transformDocument<User>(user);
  });
}

export async function getOrders(filter: OrderFilter = {}): Promise<Order[]> {
  return handleDbOperation(async () => {
    const client = await clientPromise;
    const db = client.db();
    
      const query: Record<string, any> = {};

    // Apply filters
    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.userId) {
      query.userId = filter.userId;
    }
    if (filter.customerId) {
      query.customerId = filter.customerId;
    }
    if (filter.dateFrom || filter.dateTo) {
      query.createdAt = {};
      if (filter.dateFrom) query.createdAt.$gte = new Date(filter.dateFrom);
      if (filter.dateTo) query.createdAt.$lte = new Date(filter.dateTo);
    }
    
    const orders = await db
      .collection('orders')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
      
    return orders.map(order => transformDocument<Order>(order));
  });
}

export async function getServices(): Promise<Service[]> {
  return handleDbOperation(async () => {
    const client = await clientPromise;
    const db = client.db();
    
    console.log('🔍 Fetching services from MongoDB...');
    
    const services = await db
      .collection('services')
      .find({ isActive: true })
      .sort({ category: 1, price: 1 })
      .toArray();
      
    console.log(`📦 Found ${services.length} active services`);
    
    const transformedServices = services.map(service => {
      const transformed = transformDocument<Service>(service);
      
      if (services.length > 0) {
        console.log('📋 Sample service:', {
          id: transformed.id,
          name: transformed.name,
          category: transformed.category,
          price: transformed.price,
          isActive: transformed.isActive
        });
      }
      
      return transformed;
    });
    
    return transformedServices;
  });
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return handleDbOperation(async () => {
    const client = await clientPromise;
    const db = client.db();
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const [
      totalOrders,
      totalRevenue,
      activeCustomers,
      pendingOrders,
      completedOrdersThisMonth,
      revenueThisMonth
    ] = await Promise.all([
      // Total orders
      db.collection('orders').countDocuments(),
      
      // Total revenue (only delivered orders)
      db.collection('orders').aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]).toArray(),
      
      // Active customers (ordered in last 30 days)
      db.collection('users').countDocuments({ 
        role: 'customer',
        createdAt: { $gte: thirtyDaysAgo }
      }),
      
      // Pending orders
      db.collection('orders').countDocuments({ status: 'pending' }),
      
      // Completed orders this month
      db.collection('orders').countDocuments({ 
        status: 'delivered',
        createdAt: { $gte: firstDayOfMonth }
      }),
      
      // Revenue this month
      db.collection('orders').aggregate([
        { 
          $match: { 
            status: 'delivered',
            createdAt: { $gte: firstDayOfMonth }
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]).toArray()
    ]);
    
    const totalRevenueValue = totalRevenue[0]?.total || 0;
    const revenueThisMonthValue = revenueThisMonth[0]?.total || 0;
    const averageOrderValue = totalOrders > 0 ? totalRevenueValue / totalOrders : 0;
    
    return {
      totalOrders,
      totalRevenue: totalRevenueValue,
      activeCustomers,
      pendingOrders,
      completedOrdersThisMonth,
      revenueThisMonth: revenueThisMonthValue,
      averageOrderValue: parseFloat(averageOrderValue.toFixed(2))
    };
  });
}