
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




export const updateBookingSchema = createBookingSchema

    .omit({ enquiryId: true })
    .extend({
      bookingId: z.string().refine(
        (id) =>
          /^[1-9]\d{0,18}$/.test(id) &&
          BigInt(id) <= BigInt("9223372036854775807"),
        { message: "Invalid booking ID" }
      ),

      status: z.enum(["confirmed", "completed", "cancelled"]),
    });


export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;


export const manualBookingSchema = createBookingSchema
  .omit({ enquiryId: true })
  .extend({

    customerId: z.string().refine(
      (id) =>
        id === "new" ||
        (
          /^[1-9]\d{0,18}$/.test(id) &&
          BigInt(id) <= BigInt("9223372036854775807")
        ),
      { message: "Select a valid customer" }
    ),


    customerName: z.string().trim().max(150),
    customerEmail: z.string().trim().toLowerCase().max(255),
    customerPhone: z.string().trim().max(30),

  })
  .superRefine((data, ctx) => {

    if (data.customerId === "new") {

      if (!data.customerName) {
        ctx.addIssue({
          code: "custom",
          path: ["customerName"],
          message: "Customer name is required",

        });
      }


      if (!z.email().safeParse(data.customerEmail).success) {
        ctx.addIssue({
          code: "custom",
          path: ["customerEmail"],
          message: "Valid customer email required",


        });
      }
    }
  });
  


export type ManualBookingInput =
  z.infer<typeof manualBookingSchema>;