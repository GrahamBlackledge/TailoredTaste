
import { z } from "zod";

// Validate enquiry ID and allowed status values
export const updateEnquiryStatusSchema = z.object({

  // Check the ID is a positive PostgreSQL BIGINT
  enquiryId: z.string().refine(
    (id) =>
      /^[1-9]\d{0,18}$/.test(id) &&
      BigInt(id) <= BigInt("9223372036854775807"),
    { message: "Invalid enquiry ID" }
  ),

        status: z.enum([
            "new",
            "reviewing",
            "quoted",
            "closed",
        ]),

});

export type EnquiryStatus =
  z.infer<typeof updateEnquiryStatusSchema>["status"];
