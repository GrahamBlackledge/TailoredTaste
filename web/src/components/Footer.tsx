
import Link from "next/link";

export default function Footer() {

    return (
        <footer className="bg-green-950 text-amber-50">

            <div className="max-w-6xl mx-auto px-6 pt-12 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">

                  <div>
                      <Link
                            href="/"
                            className="brand-font text-3xl font-normal hover:text-amber-200"
                        >
                            Tailored Taste
                        </Link>

                        <p className="text-sm text-amber-50/70 leading-7 mt-4 max-w-xs">
                            Personal chef and catering services,
                            thoughtfully tailored to every occasion.
                        </p>
                    </div>

                 
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-amber-200 font-semibold mb-5">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-3 text-sm text-amber-50/80">

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

                        </div>
                    </div>

               

                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-amber-200 font-semibold mb-5">
                            Get in Touch
                        </h3>

                        <p className="text-sm text-amber-50/70 leading-7 mb-4">
                            Planning a special occasion?
                            We'd love to hear about it.
                        </p>

                        <Link
                            href="/contact"
                            className="inline-block text-sm text-amber-200 border-b border-amber-200 pb-1 hover:text-white"
                        >
                            Make an Enquiry
                        </Link>
                    </div>

                </div>
                <div className="border-t border-amber-50/20 pt-6">

                    <div className="flex flex-col sm:flex-row justify-between gap-3 text-xs text-amber-50/60">

                        <p>
                            © 2026 Tailored Taste. All rights reserved.
                        </p>

                        <p>
                            Private Dining · Personal Chef · Catering
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
}
