import { Suspense } from "react";
import Link from "next/link";

import { requireAdmin } from "@/lib/auth/admin-access";
import { getEnquiryById } from "@/lib/queries/enquiries";
import { getBookingForEnquiry } from "@/lib/queries/bookings";


// type for url search parameters
type NewBookingPageProps = {
    searchParams: Promise<{ enquiryId?: string | string[];}>;

};

// Main booking page
export default function NewBookingPage({
    searchParams,
}: NewBookingPageProps) {
    return (
        <Suspense fallback={<p className="p-8">Loading booking form...</p>}>
            <BookingFormPage searchParams={searchParams} />
        </Suspense>
    );
}
// Retrive enquiry details / display booking form
async function BookingFormPage({
           searchParams,
        }: NewBookingPageProps) {

       
        await requireAdmin();

       
        const { enquiryId } = await searchParams;

        
        if (typeof enquiryId !== "string") {
            return <p className="p-8">Please select an enquiry first.</p>;
        }

        
        const enquiry = await getEnquiryById(enquiryId);

        if (!enquiry) {
            return <p className="p-8">Enquiry not found.</p>;
        }

        // Check whether this enquiry already has a booking
        const existingBooking = await getBookingForEnquiry(enquiryId);

        if (existingBooking) {
            return (
                    
                <main className="max-w-3xl mx-auto p-8">
                    <h1 className="text-2xl font-bold mb-4">
                    Booking Allready Exists
                    </h1>

                    <p className="mb-4">
                    This enquiry is already linked to booking #{existingBooking.bookingId}.
                    </p>

                    <Link
                    href={`/admin/enquiries/${enquiryId}`}
                    className="text-green-800 underline"
                    >
                    Back to enquiry
                    </Link>
                </main>
            );
        }
         return (
            <main className="max-w-3xl mx-auto p-8">

                <Link href={`/admin/enquiries/${enquiryId}`}
                className="text-green-800 underline">
                    Back to Enquiry
                </Link>

                <h1 className="text-3xl font-bold mt-6 mb-2">
                    Create booking
                </h1>
                <p className="text-gray-600 mb-8">
                    Review the enquiry details before confirming the booking.

                </p>

                <section className="bg-gray-50 border rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Customer Details
                    </h2>

                    <p><strong>Name:</strong> {enquiry.customerName}</p>
                    <p><strong>Email:</strong> {enquiry.customerEmail}</p>
                    <p><strong>Phone:</strong> {enquiry.customerPhone ?? "Not provided"}</p>

                </section>

                <form className="bg-white border rounded-lg p-6 space-y-5">
                    <h2 className="text-xl font-semibold">
                        Event Details
                    </h2>

                    <div>
                        <label htmlFor="eventDate" className="block font-medium mb-1">
                            Event date
                        </label>

                        <input
                            id="eventDate"
                            type="date"
                            name="eventDate"
                            defaultValue={enquiry.eventDate}
                            required
                            className="w-full border rounded-lg p-3" />


                    </div>

                    <div>
                        <label htmlFor="guestCount" className="block font-medium mb-1"> 
                            Number of Guests
                        </label>
                        
                        <input
                            id="guestCount"
                            type="number"
                            name="guestCount"
                            min="1"
                            defaultValue={enquiry.guestCount}
                            required
                            className="w-full border rounded-lg p-3" />
                        
                    </div>

                    <div>
                        <label htmlFor="eventLocation" className="block font-medium mb-1"> 
                            Location of event
                        </label>
                        
                        <input
                            id="eventLocation"
                            type="text"
                            name="eventLocation"
                             defaultValue={enquiry.eventLocation ?? ""}
                            className="w-full border rounded-lg p-3" />
                        
                    </div>
                    <div>
                        <label htmlFor="dietaryNotes" className="block font-medium mb-1"> 
                            Dietary requirements
                        </label>
                        
                        <textarea
                            id="dietaryNotes"
                            name="dietrayNotes"
                            rows={4}
                            defaultValue={enquiry.dietaryNotes ?? ""}
                            className="w-full border rounded-lg p-3" />
                        
                    </div>
                    <div>
                        <label htmlFor="internalNotes" className="block font-medium mb-1"> 
                            Internal notes
                        </label>
                        
                        <textarea
                            id="internalNotess"
                            name="internalNotes"
                            rows={4}
                            className="w-full border rounded-lg p-3" />
                        
                    </div>
                    <button
                        type="submit"
                        disabled
                        className="bg-green-800 text-white px-6 py-3 rounded-lg opacity-50">
                        Confirm booking
                    </button>


                   



                </form>





            </main>
         );
        }
        






