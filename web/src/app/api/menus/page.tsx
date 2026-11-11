import MenuCard from "@/components/MenuCard";
import Link from "next/link";

export default function Menus() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">

            < section className="max-w-6xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-6">Our Menus</h1>

                <p className="text-lg text-gray-600 max-w-3xl">
                    At Tailored Taste, we offer a variety of menus to suit your event and preferences. 
                    Please see a sample selection of our menus below.
                </p>

            </section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                
        <MenuCard
          title="Three-Course Dining"
          description="lorem ipsum dolor sit amet."
        />

        <MenuCard
          title="Sharing-Style Menu"
          description="lorem ipsum dolor sit amet."
        />

        <MenuCard
          title="Canapés & Small Bites"
          description="lorem ipsum dolor sit amet."
        />

      </div>
    </div>
  );
}