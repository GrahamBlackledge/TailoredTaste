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
  </main>

  );
}