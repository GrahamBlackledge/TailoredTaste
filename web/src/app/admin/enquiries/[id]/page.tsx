import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiryById } from "@/lib/queries/enquiries";

type EnquiryPageProps = {
    params: Promise<{ id: string }>;

};

export default async function EnquiryDetailPage({
    params, }:EnquiryPageProps) {
        const { id } = await params;

        const enquiry = await getEnquiryById(id);

        if (!enquiry) {
            notFound();
        }


        return  (

            <main className="min-h-screen bg-gray-100  p-8">
                <div className="max -w-4xl mx-auto">

                    <link href="/admin" className="text-green-900 hover:underline"> Back to Dashboard</link>
                    <div className="bg-white rounded-xl shadow p-8 mt-6">

                        <h1 className="text-3xl font-bold text-green-900 mb-4"> Enquiry #{enquiry.enquiryId} </h1>

                        <p className="text-gray-600-mb-8"> Status: {enquiry.status ?? "Not set"}</p>

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
            </main>


    

                                );
}