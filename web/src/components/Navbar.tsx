import Link from "next/link";
import { auth } from "@/auth"



export default async function Navbar() {

    const session = await auth();
    const isAdmin = Boolean(session?.user);
    

    return (
        <header className="bg-green-950 text-white p-5">
            <nav className="max-w-6xl mx-auto flex flex-wrap justify-between items-center ">
               
                <Link
                    href={isAdmin ? "/admin" : "/"}
                    className="flex items-baseline gap-3">

                    <span className="brand-font text-3xl text-amber-50">
                        Tailored Taste
                    </span>

                  
                    {isAdmin && (
                        <span className="text-xs uppercase tracking-widest text-amber-300">
                            Admin
                        </span>
                    )}
                </Link>

                <div className="flex flex-wrap gap-4 text-sm">

                    {isAdmin ? (
                        <>

                        <Link href="/admin" className="hover:text-amber-300">
                                Dashboard
                            </Link>


                            <Link href="/admin/bookings" className="hover:text-amber-300">
                                Bookings
                            </Link>

                            <Link href="/admin/calendar" className="hover:text-amber-300">
                                Calendar
                            </Link>

                            <Link href="/admin/menus" className="hover:text-amber-300">
                                Menus
                            </Link>

                            </>
                    ) : (
                        <>
                        
                          
                            <Link href="/" className="hover:text-amber-300">
                                Home
                            </Link>

                            <Link href="/services" className="hover:text-amber-300">
                                Services
                            </Link>

                            <Link href="/menus" className="hover:text-amber-300">
                                Menus
                            </Link>

                            <Link href="/about" className="hover:text-amber-300">
                                About
                            </Link>

                            <Link href="/contact" className="hover:text-amber-300">
                                Contact
                            </Link>
                        </>
                    )}

                </div>
            </nav>
        </header>
    );
}