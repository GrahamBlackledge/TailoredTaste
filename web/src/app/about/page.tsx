import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";

export default function About() {
    return (
        <main className="public-page bg-amber-50 text-gray-800">

            <section className="max-w-6xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-6">About Tailored Taste</h1>   

                <p className="text-lg text-gray-600 max-w-3xl">
                    Tailored Taste provides personal chef and catering
                    services, bringing great food and memorable dining
                    experiences to your home or special event.</p>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="text-lg text-gray-600 mb-4"> Created by a passionate Auckland based hospitality veteran looking to bring high end dining experinces to peoples homes
                            With years of experience in the industry and a network of skilled chefs and trusted suppliers, the people behind Tailored Taste are excited to bring you along on their culinary journey </p>

        
                    </div>
                </div>

            </section>

            <ImageCarousel />

                <section className="bg-green-950 text-white py-16">

                    <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-3xl font-bold mb-4">
                        Let's Plan Your Next Event
                    </h2>

                    <p className="text-lg mb-8">
                        Get in touch to find out how Tailored Taste
                        can help with your special occasion.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-block bg-amber-300 text-green-950 px-8 py-3 rounded font-semibold hover:bg-amber-200">
                        Make an Enquiry
                    </Link>

                    </div>

            </section>


        </main>
    );
}           