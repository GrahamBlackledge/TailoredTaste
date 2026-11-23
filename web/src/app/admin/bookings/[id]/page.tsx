import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookingById } from "@/lib/queries/bookings";
import { saveBookingChanges } from "../actions";

type BookingPageProps = {
    params: Promise<{ id: string}>;

};

export default function BookingPage({ params }: BookingPageProps) {
    return (
        <Suspense fallback={<p className="p-8"> Loading Booking.....</p>}>
            <BookingInformation params={params} />
        </Suspense>

    );


}

async function BookingInformation({ params }: BookingPageProps) {
    const { id } = await params;

    const booking = await getBookingById(id);

    if (!booking) {
        notFound();
    }
    return (
        <main className="max-w-4xl mx-auto p-8">
            <Link href="/admin/bookings" className="text-green-800 underline">
                back to bookings
            </Link>
            <h1 className="text-3xl font-bold text-green-900 mt-6 mb-6">
                Booking Id:{booking.bookingId} 
                
            </h1>

            <section className="border rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Customer Details</h2>

                <p><strong>Name:</strong>{booking.customerName}</p>
                
                <p><strong>Email:</strong>{booking.customerEmail}</p>
                <p><strong>Phone:</strong>{booking.customerPhone}</p>
            </section>

                            
                <form
                action={saveBookingChanges.bind(null, booking.bookingId)}
                className="border rounded-lg p-6 mb-6 space-y-5"
                >
                <h2 className="text-xl font-bold">Edit Booking</h2>

                <div>
                    <label htmlFor="eventDate" className="block font-medium mb-1">
                    Event Date
                    </label>
                    <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    defaultValue={booking.eventDate}
                    required
                    className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label htmlFor="guestCount" className="block font-medium mb-1">
                    Number of Guests
                    </label>
                    <input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    min="1"
                    defaultValue={booking.guestCount}
                    required
                    className="w-full border rounded-lg p-3"
                    />
                </div>

                    <div>
                        <label htmlFor="eventLocation" className="block font-medium mb-1">
                        Event Location
                        </label>
                        <input
                        id="eventLocation"
                        name="eventLocation"
                        type="text"
                        maxLength={255}
                        defaultValue={booking.eventLocation ?? ""}
                        className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <p className="font-medium">Selected Menu</p>
                        <p className="text-gray-600">
                        {booking.packageName ?? "Not selected"}
                        </p>
                    </div>

                    <div>
                        <label htmlFor="dietaryNotes" className="block font-medium mb-1">
                        Dietary Requirements / Allergies
                        </label>
                        <textarea
                        id="dietaryNotes"
                        name="dietaryNotes"
                        defaultValue={booking.dietaryNotes ?? ""}
                        rows={4}
                        maxLength={5000}
                        className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="internalNotes" className="block font-medium mb-1">
                        Internal Notes
                        </label>
                        <textarea
                        id="internalNotes"
                        name="internalNotes"
                        defaultValue={booking.internalNotes ?? ""}
                        rows={3}
                        maxLength={5000}
                        className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block font-medium mb-1">
                        Booking Status
                        </label>
                        <select
                        id="status"
                        name="status"
                        defaultValue={booking.status}
                        className="w-full border rounded-lg p-3"
                        >
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900 cursor-pointer"
                    >
                        Save Changes
                    </button>
                </form>


            {booking.enquiryId && (
                <Link
                href={`/admin/enquiries/${booking.enquiryId}`}
                className="text-green-800 underline"
                >
                View Original Enquiry
                </Link>
            )}



        </main>
    )
}