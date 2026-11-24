
import { Suspense } from "react";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import BookingCalendar from "./calendar/Calendar";


import { requireAdmin } from "@/lib/auth/admin-access";
import { getEnquiries, getEnquirySummary } from "@/lib/queries/enquiries";
import { getBookings } from "@/lib/queries/bookings";

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <Suspense fallback={<p>Checkin admin access...</p>}>
                <AdminDashboard />
            </Suspense>
        </main>
    );
}

async function AdminDashboard() {

    // Verify admin
    const admin = await requireAdmin();

    // Fet enquirey records from PostgreSQL
    const enquiries = await getEnquiries();

    // get summary of enquiries
    const summary = await getEnquirySummary();
    const pendingEnquiries = summary.newEnquiries + summary.reviewingEnquiries;
   
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
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

            <h1 className="text-3xl font-bold text-green-900 mb-4">
                Admin Dashboard
            </h1>

            <p className="mb-2">
                Welcome, {admin.full_name}
            </p>

            <p className="text-gray-500 mb-2">
                {admin.email}
            </p>

            <p className="text-gray-500 mb-6">
                Role: {admin.role}
            </p>

            <p className="mb-8">
                Tailored Taste administration dashboard.
            </p>

            {/* Sign out and return to login */}
            <form
                action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/admin/login" });
                }}
            >
                <button
                    type="submit"
                    className="bg-green-900 text-white px-5 py-3 rounded-lg hover:bg-green-800 cursor-pointer"
                >
                    Sign Out
                </button>
            </form>

            {/* summary cards*/}
            <section className="mt-10">
                <h2 className="text-2xl font-bold text-green-900 mb-6">
                    Enquiry Overview
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <div className="bg-gray-50 border rounded-lg p-5">
                        <h3 className="text-sm text-gray-600">
                            Total Enquiries
                        </h3>
                        <p className="text-3xl font-bold text-green-900 mt-2">
                            {summary.totalEnquiries}
                        </p>
                    </div>
                    <div className="bg-gray-50 border rounded-lg p-5">
                        <h3 className="text-sm text-gray-600">
                            New Enquiries
                        </h3>
                        <p className="text-3xl font-bold text-green-900 mt-2">
                            {summary.newEnquiries}
                        </p>
                    </div>
                    <div className="bg-gray-50 border rounded-lg p-5">
                        <h3 className="text-sm text-gray-600">
                            Pending Enquiries
                        </h3>
                        <p className="text-3xl font-bold text-green-900 mt-2">
                            {pendingEnquiries}
                        </p>
                    </div>
                    <div className="bg-gray-50 border rounded-lg p-5">
                        <h3 className="text-sm text-gray-600">
                            Quoted Enquiries
                        </h3>
                        <p className="text-3xl font-bold text-green-900 mt-2">
                            {summary.quotedEnquiries}
                        </p>
                    </div>

                </div>



            </section>



            {/* Enquiry dashboard*/}

            <section className="mt-10">

                <h2 className="text-2xl font-bold text-green-900 mb-2">
                    Recent Enquiries 
                </h2>

                <p className="text-gray-500 mb-6">
                    {enquiries.length} recent enquiries 
                </p>

                {enquiries.length === 0 ? (
                    <p className="text-gray-500">
                        No Enquirires
                    </p>
                    ) : (
                         <div className="overflow-x-auto border border-gray-200 rounded-lg">
                             <table className="w-full text-left text-sm">

                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                    <th className="px-5 py-3">ID</th>
                                    <th className="px-5 py-3">Customer</th>
                                    <th className="px-5 py-3">Email</th>
                                    <th className="px-5 py-3">Event Date </th>
                                    <th className="px-5 py-3"> Guests</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Action</th>
                                      </tr>
                                </thead>
                                 <tbody>
            
                                    {enquiries.map((enquiry) => (

                                    <tr
                                        key={enquiry.enquiryId}
                                        className="border-t border-gray-200 hover:bg-gray-50">
                                    

                                        <td className="px-5 py-4">
                                        {enquiry.enquiryId}
                                        </td>

                                        <td className="px-5 py-4 font-medium">
                                        {enquiry.customerName}
                                        </td>

                                        <td className="px-5 py-4">
                                        {enquiry.customerEmail}
                                        </td>

                                        <td className="px-5 py-4">
                                        {enquiry.eventDate}
                                        </td>

                                        <td className="px-5 py-4">
                                        {enquiry.guestCount}
                                        </td>

                                        <td className="px-5 py-4">
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                            {enquiry.status ?? "Not set"}
                                        </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Link
                                                href={`/admin/enquiries/${enquiry.enquiryId}`}
                                                className="text-green-900 font-semibold hover:underline">View</Link>
                                        </td>

                                    </tr>

                                    ))}
                                </tbody>

                                </table>

                            </div>

                            )}
                          
                        
            </section>
            <section className="mt-8 bg-white border rounded-lg p-5">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-green-900">Booking Calendar
                        </h2>

                        <Link href="/admin/calendar" className="text-green-800 underline text-sm">Full Calendar</Link>
                    </div>

                    <div className="max-w-xl">
                        <BookingCalendar events={calendarEvents} compact />
                    </div>

                </section>





        </div>
    );
}