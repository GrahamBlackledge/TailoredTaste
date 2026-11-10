import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-green-950 text-white py-4 mt-auto">

            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">

        
          <h2 className="text-xl font-bold mb-2">Tailored Taste</h2>

          <p className="text-gray-300">Personal chef and catering services. </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                    <Link href="/" className="hover:text-amber-300">Home</Link>
                    <Link href="/services" className="hover:text-amber-300">Services</Link>
                    <Link href="/menus" className="hover:text-amber-300"> Menus</Link>
                    <Link href="/contact" className="hover:text-amber-300">Contact</Link>
            </div>

        </footer>
  );
}