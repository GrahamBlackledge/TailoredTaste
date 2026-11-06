export default function Home() {
  return (
    <main className="bgamber-50 text-gray-800">

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
            <a href="/enquiry" className="hover:text-amber-300">Contact</a>

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









  </main>

  );
}