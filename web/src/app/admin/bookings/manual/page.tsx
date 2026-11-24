import { Suspense } from "react";
import Link from "next/link";

import { getCustomers } from "@/lib/queries/customers";

export default function ManualBookingPage() {
    return(
        <Suspense fallback={<p className="p-8"> Loading booking Form....</p>}>
            <AddBookingForm />
        </Suspense>


    );
}


async function AddBookingForm() {
    const customers = await getCustomers();

    return (
        <main className="max-w-3xl mx-auto p-8">
            <Link href="/admin" className="text-green-800 underline">Back to dashboard</Link>

            <h1 className="text-3xl font-bold text-green-900 mt-6 mb-6">Add new Booking</h1>

             <form className="border rounded-lg p-6 space-y-5">

                <div>
                    <label htmlFor="customerId" className="bock font-medium mb-1">
                        Customer
                    </label>

                    <select 
                        id="customerId"
                        name="customerId"
                        defaultValue=""
                        className="w-full border rounded-lg p-3"
                        required>
                            <option value="" disabled> Select Customer</option>


                            {customers.map((customer) => (
                                <option key={customer.customerId} value={customer.customerId}>
                                    {customer.fullName}  - {customer.email}

                                </option>
                            


                            ))}

                            <option value="new"> New Customer</option>


                        </select>

                </div>

                <fieldset className="border rounded-lg p-4 space-y-3">
                    <legend className="font-semibold px-2"> New customer Details</legend>
                    <input
                    type="text"
                    name="customerName"
                    maxLength={150}
                    placeholder="Full name"
                    className="w-full border rounded-lg p-3"
                    />

                    <input
                    type="email"
                    name="customerEmail"
                    placeholder="Email address"
                    className="w-full border rounded-lg p-3"/>

                    <input
                    type="tel"
                    name="customerPhone"
                    placeholder="Phone"
                    className="w-full border rounded-lg p-3"/>
                </fieldset>

                    <div>
                        < label htmlFor="eventDate" className="block font-medium mb-1">
                            Event Date
                        </label>
                        <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        required
                            className="w-full border rounded-lg p-3"/>

                    </div>

                    <div>
                        <label htmlFor="guextCount" className="block font-medium mb-1">
                            Number of Guests

                        </label>
                        <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        min="1"
                        required
                        className="w-full border rounded-lg p-3"/>


                    </div>
                    <div>
                        <label htmlFor="eventLocation" className="block font-medium mb-1">
                            Event Location
                        </label>
                            <input
                            type="text"
                            id="eventLocation"
                            name="eventLocation"
                            maxLength={255}
                            className="w-full border rounded-lg p-3"/>
                                  
                    </div>
                    <div>
                        <label htmlFor="dietaryNotes" className="block font-medium mb-1">
                            Dietary Requirements / Allergies
                        </label>
                            <textarea
                            id="dietaryNotes"
                            name="dietaryNotes"
                            rows={3}
                            className="w-full border rounded-lg p-3" />
                         </div>

                    
                     <div>
                        <label htmlFor="internalNotes" className="block font-medium mb-1">
                            Internal Notes
                        </label>
                            <textarea
                            id="internalNotes"
                            name="internalNotes"
                            rows={3}
                            className="w-full border rounded-lg p-3" />

                    </div>

                     <button

                        type="submit"
                        className="bg-green-800 text-white px-6 py-3 rounded-lg opacity-50">
                        Confirm Booking
                    </button>


                            




                


            </form>
        </main>
    )
}