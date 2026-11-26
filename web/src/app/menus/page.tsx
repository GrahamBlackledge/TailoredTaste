import MenuCard from "@/components/MenuCard";
import Link from "next/link";
import { Suspense } from "react";
import { getPublicMenuPackages } from "@/lib/queries/menus";

export default function Menus() {
    return (
      
        <div className="public-page px-6 py-16">

            <section className="max-w-6xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-6">Our Menus</h1>

                <p className="text-lg text-gray-600 max-w-3xl">
                    At Tailored Taste, we offer a variety of menus to suit your event and preferences. 
                    Please see a sample selection of our menus below.
                </p>

            </section>
           

             <Suspense fallback={<p>Loading menus...</p>}>
                <PublicMenuCards />
             </Suspense>   
       

      </div>
    
  );
}


async function PublicMenuCards() {

    // Retrieve active menu packages 
    const menus = await getPublicMenuPackages();

      if (menus.length === 0) {
        return (
            <p className="text-gray-500">
                No menus currently available.
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <MenuCard
              key={menu.packageId}
              title={menu.packageName}
              description={menu.description ?? ""}
              fileUrl={

                menu.menuFilePath
                 ? `/api/menus/${menu.packageId}/pdf`
                : undefined

                 }/>

            ))}
      
        </div>
    );
}
