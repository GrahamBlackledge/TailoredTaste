
import { z } from "zod";


export const createBookingSchema = z.object({

  enquiryId: z.string().refine(
    (id) =>
      /^[1-9]\d{0,18}$/.test(id) &&
      BigInt(id) <= BigInt("9223372036854775807"),
    { message: "Invalid enquiry ID" }
  ),
  
  eventDate: z.iso.date(),
  guestCount: z.coerce.number()
    .int()
    .min(1, "Guest count must be at least 1"),


  eventLocation: z.string()
    .trim()
    .max(255, "Location is too long"),

  dietaryNotes: z.string()
    .trim()
    .max(5000, "Dietary notes too long")
    .nullish(),

  internalNotes: z.string()
    .trim()
    .max(5000, "Internal notes too long"),

});


export type CreateBookingInput = z.infer<typeof createBookingSchema>;
