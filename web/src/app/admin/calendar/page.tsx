import { Suspense } from "react";
import Link from "next/link";
import { getBookings } from "@/lib/queries/bookings";
import BookingCalendar from "./Calendar";

export default function CalendarPage() {
  return (
    <Suspense fallback={<p>Loading calendar...</p>}>
      <CalendarContent />
    </Suspense>
  );
}

async function CalendarContent() {

    const bookings = await getBookings();

     const events = bookings
        
        .filter((booking) => booking.status === "confirmed")
        .map((booking) => ({
            id: booking.bookingId,
            title: booking.customerName,
            start: booking.eventDate,
            allDay: true,
            url: `/admin/bookings/${booking.bookingId}`,

            })
        );

        return (
            <main className="max-w-6xl mx-auto p-8">
                <Link href="/admin" className="text-green-800 underline">Back to Dashboard</Link>

                <h1 className="text-3xl font-bold my-6">Booking Calendar</h1>

                <BookingCalendar events={events}/>
            </main>
        )
}