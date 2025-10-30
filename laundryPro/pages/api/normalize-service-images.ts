import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const services = await db.collection('services').find({}).toArray();

    let updated = 0;

    for (const svc of services) {
      if (!svc || !svc.image || typeof svc.image !== 'string') continue;

      const img = svc.image.trim();
      let newImg: string | null = null;

      // Fix: If image path starts with /images/, change to /assets/images/
      if (img.startsWith('/images/')) {
        newImg = img.replace('/images/', '/assets/images/');
      }
      // If image is missing the /assets/ prefix but has images/, add it
      else if (img.startsWith('images/')) {
        newImg = '/assets/' + img;
      }
      // If image path is just a filename, add the full path
      else if (!img.includes('/') && img.includes('.')) {
        newImg = `/assets/images/${img}`;
      }
      // If image path is wrong but has correct filename, fix the path
      else if (img.includes('wash-fold') || img.includes('dry-clean') || img.includes('ironing') || img.includes('stain-removal') || img.includes('premium')) {
        const filename = img.split('/').pop();
        if (filename) {
          newImg = `/assets/images/${filename}`;
        }
      }

      if (newImg && newImg !== img) {
        await db.collection('services').updateOne({ _id: svc._id }, { $set: { image: newImg } });
        updated += 1;
        console.log(`🔄 Updated ${svc.name}: ${img} → ${newImg}`);
      }
    }

    return res.status(200).json({ 
      message: 'Image paths normalized successfully', 
      updated 
    });
  } catch (err) {
    console.error('normalize-service-images error', err);
    return res.status(500).json({ error: 'Failed to normalize service images' });
  }
}