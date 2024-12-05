// pages/api/social-leads.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import connectDB, { SocialLead } from '../../lib/mongodb';

const SocialLeadSchema = z.object({
  platform: z.enum(['twitter', 'linkedin', 'facebook']),
  username: z.string(),
  profileUrl: z.string().url(),
  keywords: z.array(z.string()).optional(),
  notes: z.string().optional()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const validatedData = SocialLeadSchema.parse(req.body);

      // Check for existing lead
      const existingLead = await SocialLead.findOne({ 
        username: validatedData.username,
        platform: validatedData.platform
      });

      if (existingLead) {
        return res.status(400).json({ 
          error: 'Lead already exists' 
        });
      }

      // Create new lead
      const newLead = new SocialLead(validatedData);
      await newLead.save();

      res.status(201).json({ 
        message: 'Social media lead tracked',
        lead: newLead 
      });
    } catch (error) {
      console.error('Social lead tracking error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch leads with filtering options
      const leads = await SocialLead.find({
        contactStatus: 'not-contacted'
      }).limit(50);

      res.status(200).json(leads);
    } catch (error) {
        console.log("error: ", error)
      res.status(500).json({ 
        error: 'Failed to fetch leads' 
      });
    }
  }
}