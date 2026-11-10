import Link from "next/link";

export default function Navbar() {
    return (
        <header className="bg-green-950 text-white p-5">
            <nav className="max-w-6xl mx-auto flex flex-wrap justify-between items-center ">

                <h2 className="text-2xl font-bold">Tailored Taste </h2>

                <div className="flex flex-wrap gap-4">
                    <Link href="/" className="hover:text-amber-300">Home</Link>
                    <Link href="/services" className="hover:text-amber-300">Services</Link>
                    <Link href="/menus" className="hover:text-amber-300">Menus</Link>
                    <Link href="/about" className="hover:text-amber-300">About</Link>
                    <Link href="/contact" className="hover:text-amber-300">Contact</Link>
                </div>
            </nav>
        </header>

    );
}