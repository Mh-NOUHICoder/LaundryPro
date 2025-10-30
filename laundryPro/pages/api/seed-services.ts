import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const sampleServices = [
  {
    name: "Wash & Fold",
    description: "Professional washing and folding service for your everyday laundry",
    price: 15.99,
    category: "wash-fold",
    isActive: true,
    image: "/assets/images/wash-fold.jpg",
    estimatedTime: "24 hours",
    minimumOrder: 1,
    unit: "load",
    features: ["Eco-friendly detergents", "Same-day service available", "Free pickup & delivery"]
  },
  {
    name: "Dry Cleaning",
    description: "Expert dry cleaning for suits, dresses, and delicate fabrics",
    price: 8.99,
    category: "dry-clean",
    isActive: true,
    image: "/assets/images/dry-clean.jpg",
    estimatedTime: "48 hours",
    minimumOrder: 1,
    unit: "item",
    features: ["Stain treatment", "Professional pressing", "Garment protection"]
  },
  {
    name: "Ironing Service",
    description: "Professional ironing for wrinkle-free clothes",
    price: 5.99,
    category: "ironing",
    isActive: true,
    image: "/assets/images/ironing.jpg",
    estimatedTime: "24 hours",
    minimumOrder: 2,
    unit: "item",
    features: ["Steam ironing", "Hanging fold", "Same-day service"]
  },
  {
    name: "Stain Removal",
    description: "Specialized treatment for tough stains",
    price: 12.99,
    category: "stain-removal",
    isActive: true,
    image: "/assets/images/stain-removal.jpg",
    estimatedTime: "48 hours",
    minimumOrder: 1,
    unit: "item",
    features: ["Advanced stain treatment", "Color-safe process", "Guaranteed results"]
  },
  {
    name: "Premium Laundry",
    description: "Luxury laundry service with premium care",
    price: 25.99,
    category: "premium",
    isActive: true,
    image: "/assets/images/premium.jpg",
    estimatedTime: "24 hours",
    minimumOrder: 1,
    unit: "load",
    features: ["Premium detergents", "Hand folding", "Eco-friendly packaging"]
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    
    console.log('🌱 Seeding services...');
    
    // Clear existing services
    await db.collection('services').deleteMany({});
    
    // Insert sample services
    const result = await db.collection('services').insertMany(sampleServices);
    
    console.log(`✅ Seeded ${result.insertedCount} services`);
    
    res.status(200).json({ 
      message: 'Sample services added successfully',
      insertedCount: result.insertedCount 
    });
  } catch (error) {
    console.error('❌ Seed error:', error);
    res.status(500).json({ error: 'Failed to seed services' });
  }
}