// pages/api/waitlist.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import connectDB, { Waitlist } from '../../lib/mongodb';

// Zod schema for email validation
const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('landing-page')
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to MongoDB
  await connectDB();

  if (req.method === 'POST') {
    try {
      // Validate input
      const validatedData = EmailSchema.parse(req.body);

      // Check if email already exists
      const existingEmail = await Waitlist.findOne({ 
        email: validatedData.email 
      });

      if (existingEmail) {
        return res.status(400).json({ 
          error: 'Email already in waitlist' 
        });
      }

      // Create new waitlist entry
      const newWaitlistEntry = new Waitlist({
        email: validatedData.email,
        source: validatedData.source
      });

      await newWaitlistEntry.save();

      res.status(201).json({ 
        message: 'Successfully added to waitlist',
        email: validatedData.email 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: 'Invalid input',
          details: error.errors 
        });
      }

      console.error('Waitlist signup error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}