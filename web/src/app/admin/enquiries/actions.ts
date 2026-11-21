"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin-access";
import { updateEnquiryStatusSchema } from "@/lib/validation/status";
import { updateEnquiryStatusInDb } from "@/lib/queries/enquiries";

export async function saveEnquiryStatus(
    enquiryId: string,
    formData: FormData

) {

    await requireAdmin();

    //validates the ID and status
    const validated = updateEnquiryStatusSchema.safeParse({
         enquiryId,
         status: formData.get("status"),
    });

    //Error message if data invalid
    if (!validated.success) {
        throw new Error("Invalid data");
    }

    // update in postgre
     const updated = await updateEnquiryStatusInDb(
        validated.data.enquiryId,
        validated.data.status
     );

     if (!updated) {
        throw new Error("enquiry not found")


     }

     revalidatePath("admin");
     revalidatePath(`/admin/enquiries/${validated.data.enquiryId}`);






}