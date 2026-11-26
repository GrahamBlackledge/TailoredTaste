import ServiceCard from "@/components/ServiceCard";

import Link from "next/link";

export default function Services()  {
    return (
        <main className="public-page bg-amber-50 text-gray=800">

            <section className="max-w-6xl mx-auto px-6 py-16">
                <h1 className=" tect-4xl font-bold mb-6">Our Services</h1>
                 <p className="text-lg text-gray-600 max-w-3xl">
                    Tailored Taste offers a range of services,
                    from an itimate dinner with one of our private chefs,
                    to catering fo your wedding or special event.
                    Whatever the occasion, we can provide a tailored experience.
                 </p>
                 </section>

                  <section className="bg-white py-16">
                    <div className="max-w-6xl mx-auto px-6">

                      <h2 className="text-3xl font-bold mb-8">Our services</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ServiceCard title="Private Dining"
                            description="Enjoy a personal dining experience in the comfort of your own home with one of our private chefs." />  
                            
                            <ServiceCard title="Event catering"
                            description="Ensure your next event goes off with a bang wit our catering service." />  

                            <ServiceCard title="Special Occasions"
                            description="From birthdays to anniversaries, we create memorable dining experiences and go the extra mile." />  

                            <ServiceCard title="Custom Menus"
                            description="Menus fine tuned around your personal tastes, preferences and dietary requirements." />  

                        </div>
                    </div>
                   </section>
                    <section className="max-w-6xl mx-auto px-6 py-16 text-center">

                        <h2 className="text-3xl font-bold mb-4">
                        Interested in Our Services?
                        </h2>

                        <p className="text-lg text-gray-600 mb-8">
                        Get in touch to discuss your event and requirements.
                        </p>

                        <Link
                        href="/contact"
                        className="inline-block bg-green-900 text-white px-6 py-3 rounded hover:bg-green-700"
                        >
                        Make an Enquiry
                        </Link>

                    </section>

                    </main>
                );

                        




                       


            



   
}