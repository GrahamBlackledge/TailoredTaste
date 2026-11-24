import { Suspense } from "react";
import Link from "next/link";
import { getBookings } from "@/lib/queries/bookings";
import BookingCalendar from "../calendar/Calendar";

export default function BookingsPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading bookings...</p>}>
      < BookingsList />
    </Suspense>
  );
}

async function BookingsList() {
  // Retrieve bookings from PostgreSQL
  const bookings = await getBookings();

    //Mini calendar import
    const calendarEvents = bookings
        .filter((booking) => booking.status === "confirmed")
        .map((booking) => ({
            id: booking.bookingId,
            title: booking.customerName,
            start: booking.eventDate,
            allDay: true,
            url: `/admin/bookings/${booking.bookingId}`,
        }));


  return (
     <main className="max-w-6xl mx-auto p-8">
        <Link href={"/admin"} className="text-green-800 underline"> Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-green-900 mt-6 mb-6"> Booking mangement</h1>

        <div className="bg-white border rounded-lg overflow-x-auto" >
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Guests</th>

                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>


                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingId} className="border-t">
                            <td className="p-4">{booking.customerName}</td>
                            <td className="p-4">{booking.eventDate}</td>
                            <td className="p-4">{booking.guestCount}</td>
                            <td className="p-4">{booking.status}</td>
                            <td className="p-4">
                                <Link href={`/admin/bookings/${booking.bookingId}`}
                                className="text-green-800 underline">
                                    View booking
                                </Link> </td>
                        </tr>
                    ))} 
                </tbody>
            </table>

            {bookings.length === 0 && (

                <p className="p-6 text-gray-600">
                No bookings found.
                </p>
            )}


        </div>
     </main>
  )
}

