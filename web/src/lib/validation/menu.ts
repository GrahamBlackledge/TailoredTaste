import { z } from "zod";

export const createMenuPackageSchema = z.object({

    packageName: z.string()
    .trim()
    .min(1, "Package name required")
    .max(150, "Package name to long"),

    description: z.string()
    .trim()
    .max(2000, " Description to long"),

    pricePerPerson: z.string()
    .trim()
    .regex(/^(0|[1-9]\d{0,7})(\.\d{1,2})?$/, "Eneter valid price up to 2 decimal places"),

    minimumGuests: z.coerce.number<number>()
    .int()
    .min(1, "Must have at least 1 guest")


});

export type CreateMenuPackageInput = 
z.infer<typeof createMenuPackageSchema>;


export const updateMenuPackageSchema =
  createMenuPackageSchema.extend({

    packageId: z.string().refine(
      (id) =>
        /^[1-9]\d{0,18}$/.test(id) &&
        BigInt(id) <= BigInt("9223372036854775807"),
      { message: "Invalid package ID" }
    ),

  });

export type UpdateMenuPackageInput =
  z.infer<typeof updateMenuPackageSchema>;