import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookingById } from "@/lib/queries/bookings";

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

            <section className="border rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Customer Details</h2>

                <p><strong>Date:</strong>{booking.eventDate}</p>
                <p><strong>Number of Guests:</strong>{booking.guestCount}</p>
                <p><strong>Location:</strong>{booking.eventLocation ?? "Unknown"}</p>
                <p><strong>Menu:</strong>{booking.packageName ?? "Not chosen"}</p>
                <p><strong>Status:</strong>{booking.status}</p>

                 <h3 className="font-semibold mt-5">Dietary Requirements</h3>
                    <p className="whitespace-pre-wrap">
                    {booking.dietaryNotes ?? "None recorded"}
                    </p>

                    <h3 className="font-semibold mt-5">Internal Notes</h3>
                    <p className="whitespace-pre-wrap">
                    {booking.internalNotes ?? "None recorded"}
                    </p>

            </section>

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