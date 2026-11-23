"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin-access";
import { createBookingSchema } from "@/lib/validation/booking";
import { createBookingFromEnquiry } from "@/lib/queries/bookings";
import { updateBookingSchema } from "@/lib/validation/booking";
import { updateBooking } from "@/lib/queries/bookings";

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

    const bookingId = await createBookingFromEnquiry(result.data);

    revalidatePath("/admin");
    revalidatePath(`/admin/enquiries/${enquiryId}`);
    revalidatePath("/admin/bookings");

    redirect(`/admin/bookings/${bookingId}`);

}

// Save changes to an existing booking
export async function saveBookingChanges(
  bookingId: string,
  formData: FormData
) {
  await requireAdmin();

  const result = updateBookingSchema.safeParse({
    bookingId,
    eventDate: formData.get("eventDate"),
    guestCount: formData.get("guestCount"),
    eventLocation: formData.get("eventLocation"),
    dietaryNotes: formData.get("dietaryNotes"),
    internalNotes: formData.get("internalNotes"),
    status: formData.get("status"),
  });

  if (!result.success) {
    throw new Error("Invalid booking information");
  }

 

  const updated = await updateBooking(result.data);

  if (!updated) {
    throw new Error("Booking not found");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);


  redirect(`/admin/bookings/${bookingId}`);
  
}

