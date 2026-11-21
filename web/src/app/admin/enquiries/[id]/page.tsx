import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiryById } from "@/lib/queries/enquiries";
import { saveEnquiryStatus } from "../actions";
import { Suspense } from "react";


type EnquiryPageProps = {
    params: Promise<{ id: string }>;

};

export default async function EnquiryDetailPage({
    params, }:EnquiryPageProps) {
        return (
             <Suspense fallback={<p className="p-8">Loading enquiry...</p>}>
            <EnquiryDetails params={params} />
            </Suspense>

            );
        }
        //display enquiry details
        async function EnquiryDetails({
            params,
        }: EnquiryPageProps) {

                // gets id from url
            const { id } = await params;
             
            //Checks admin access and retrives id
            const enquiry = await getEnquiryById(id);
             
            if (!enquiry) {
                notFound();
                }

 


      


        return  (

            <main className="min-h-screen bg-gray-100  p-8">
                <div className="max -w-4xl mx-auto">

                    <Link href="/admin" className="text-green-900 hover:underline"> Back to Dashboard</Link>
                    <div className="bg-white rounded-xl shadow p-8 mt-6">

                        <h1 className="text-3xl font-bold text-green-900 mb-4"> Enquiry #{enquiry.enquiryId} </h1>

                        <p className="text-gray-600-mb-8"> Status: {enquiry.status ?? "Not set"}</p>
                        <form action={saveEnquiryStatus.bind(null, enquiry.enquiryId)}
                             className="bg-gray-50 p-6 rounded-lg mb-8">

                                <h2 className="text-lg font-bold mb-4">
                                    Upadte status
                                </h2>
                                <label htmlFor="status" className="block text-sm font-medium mb-2">
                                    Select status
                                </label>

                                <select
                                    id="status"
                                     name="status"
                                     defaultValue={enquiry.status ?? "new"}
                                    className="w-full border border-gray-300 rounded-lg p-3 mb-4">
                                        <option value="new">New</option>
                                        <option value="reviewing">Reviewing</option>
                                        <option value="quoted">Quoted</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    <button type="submit" className="bg-green-900 text-white px-5 py-3 rounded-lg hover:bg-green-800 cursor-pointer">
                                        Save status
                                    </button>




                        </form>


                        <section className="mb-8">

                            <h2 className="text-xl font-bold mb-4 ">Customer Information </h2>

                            <p className="mb-2">
                                <strong>Name:</strong> {enquiry.customerName}
                            </p>
                            <p className="mb-2">
                                <strong>Email:</strong> {enquiry.customerEmail}
                            </p>
                            <p className="mb-2">
                                <strong>Phone :</strong>{" "} {enquiry.customerPhone ?? "Not provided"}
                            </p>


                        </section>
                        <section className="mb-8">

                            <h2 className="text-xl font-bold mb-4 ">Event information  </h2>
                            <p className="mb-2">
                                <strong>Event Date:</strong> {enquiry.eventDate}
                                </p>
                            <p className="mb-2">
                                <strong>Guests :</strong>{enquiry.guestCount}
                                </p>
                            <p className="mb-2">
                                <strong>location:</strong>{" "}  {enquiry.eventLocation ?? "Not provided"}
                                </p>
                            <p className="mb-2">
                                Dietary requirements:
                                </p>
                            <p className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                                {enquiry.dietaryNotes ?? "Not provided"} </p>

                        </section>
                        <section>

                            <h2 className="text-xl font-bold mb-4">
                                Enquiry Details
                            </h2>

                            <p>
                                <strong>Submitted:</strong>{" "}
                                {enquiry.createdAt
                                    ? enquiry.createdAt.toLocaleString("en-NZ", {
                                        timeZone: "Pacific/Auckland",
                                    })
                                    : "Unknown"}
                            </p>

          </section>








                    </div>
                </div>
                <Link
                    href={`/admin/bookings/new?enquiryId=${enquiry.enquiryId}`}
                    className="inline-block bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900">
                    Create Booking
                </Link>
            </main>


    

                                );
}