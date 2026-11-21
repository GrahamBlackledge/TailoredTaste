"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin-access";
import { createBookingSchema } from "@/lib/validation/booking";
import { createBookingFromEnquiry } from "@/lib/queries/bookings";

export async function createBooking(
    enquiryId: string,
    formData: FormData
) {
    await requireAdmin();

    const result = createBookingSchema.safeParse({
        enquiryId,
        eventDate: formData.get("eventDate"),
        guestCount: formData.get("guestCount"),
        eventLocation: formData.get("eventLocation"),
        dietaryNotes: formData.get("dietaryNotes"),
        internalNotes: formData.get("internalNotes"),



    });

    if (!result.success) {
        console.log(result.error.flatten());
        throw new Error("Invalid data")

    }

    await createBookingFromEnquiry(result.data);

    revalidatePath("/admin");
    revalidatePath(`/admin/enquiries/${enquiryId}`);

    redirect(`/admin/enquiries/${enquiryId}`)

}