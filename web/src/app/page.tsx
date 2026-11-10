import ServiceCard from "@/components/ServiceCard";
import MenuCard from "@/components/MenuCard";

export default function Home() {
  return (
    <main className="bg-amber-50 text-gray-800">

      {/* Navigation */}
      <header className="bg-green-950 text-white p-5">
        <nav className="max-w-6xl mx-auto flex flex-wrap justify-between items-center ">


           <h2 className="text-2xl font-bold">
            Tailored Taste
          </h2>


          <div className="flex flex-wrap gap-4">
            <a href="/" className="hover:text-amber-300">Home</a>
             <a href="/services" className="hover:text-amber-300">Services</a>
            <a href="/menus" className="hover:text-amber-300">Menus</a>
            <a href="/contact" className="hover:text-amber-300">Contact</a>

            </div>
        </nav>


        
      </header>

      {/* hero Sectiomn */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Personal chef and Catering</h1>

            <p className="text-lg mb-6">Experience the art of fine dining in the comfort of your own home with our personal chef and catering services.</p>

            <div className="flex flex-wrap gap-4">
              <a href="/enquiry" className="bg-green-900 text-white px-6 py-3 rounded hover:bg-green-700">Make an Enquiry</a>

              <a href="/menus"
              className="border border-green-900 text-green-900 px-6 py-3 rounded hover:bg-green-100">View Menus</a>

            </div>

         
         </div>


        <div className="w-full md:w-1/2 h-72 bg-gray-200 flex items-center justify-center rounded-lg">
          <h3 className="text-gray-500">Hero image</h3>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Tailored Taste brings personal chef and catering services to your home or event. 
            From private dinners to specialoccasions, our aim is to provide great food and a memorable dining experience. </p>

        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-lg text-gray-600 max-w-3xl">From our chefs to your home, explore the different ways our chefs can cater to you</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <ServiceCard title="Private Dining"
          description="Enjoy our chefs restaurant quallity dishes in the comfort of your own home."/>

          <ServiceCard title="Event Catering"
          description="Let us look after your next event with our professional catering services."/>

          <ServiceCard title="Special Occasions"
          description="From birthdays to anniversaries, we create memorable dining experiences and will go the extra mile."/>
          
          <ServiceCard title="Custom Menus"
          description="Menus created around your tastes and dietary requirementss"/>
              
          </div>

          <div className="mt-8">
            <a href="/services" 
            className="text-green-900 font-semibold hover:underline ">Explore our Services</a>
          </div>

      </section>

      {/* Menus Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-4">Our Menus</h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-8">Discover our range of offerings, with menus tailored to suit your occasion</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <MenuCard
                title="Private Dining"
                description="A personal dining experience for small groups and gatherings."
              />

              <MenuCard
                title="Event menus"
                description="A selection of carefully prepared courses for your event."
              />

              <MenuCard
                title="Bespoke Menus"
                description="A menu planned around your preferences and requirements."
              />

            </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section className="bg-green-950 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center ">
          <h2 className="text-3xl font-bold mb-4">Ready to make an enquiry?</h2>
          <p className="text-lg mb-6">Get in touch with us to discuss your special occasion.</p>

          <a href="/contact" className="inline-block bg-amber-300 text-green-950 px-8 py-3 rounded font-semibold hover:bg-amber-200">Make an Enquiry </a>
        </div>
      </section>

    </main>
  );
}












