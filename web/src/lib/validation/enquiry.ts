import { z  } from "zod";


export const enquirySchema = z.object({
    
    fullName: z.string().min(2).max(100).trim(),

    email: z.email().max(255),

    phone: z.string().max(30).optional(),
    
    eventDate: z.iso.date(),


    guestCount: z.number().int().positive(),

   eventLocation: z.string().trim().max(255).optional(),

  dietaryNotes: z.string().trim().max(2000).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;