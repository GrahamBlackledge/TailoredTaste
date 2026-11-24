import { Suspense } from "react";
import Link from "next/link";
import { getMenuPackages } from "@/lib/queries/menus";     


export default function AdminMenusPage() {
    return (
        <Suspense fallback={<p>Loading menus .....</p>}>
            <MenuManagement/>

        </Suspense>

    );

}

async function MenuManagement() {

    const menus = await getMenuPackages();

    return (
        <main className="max-w-5xl mx-auto p-8">
            <Link href="/admin" className="text-green-800 underline">
                Back to dashboard
            </Link>


            <h1 className="text-3xl font-bold text-green-900 mt-6 mb-3">
                Menu Management
            </h1>
            <div className="border rounded-lg overflow-hidden">

                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Package</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Active</th>
                        </tr>
                    </thead>

                    <tbody>
                        {menus.map((menu) => (
                            <tr key={menu.packageId} className="border-t">

                                <td className="p-4 font-medium">
                                    {menu.packageName}
                                </td>
                                <td className="p-4">
                                    {menu.menuFilePath ? "Menu uploaded": "No menu"}
                                </td>

                                <td className="p-4">
                                    {menu.isActive ? "Yes" : "No"}
                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>

                {menus.length === 0 && (
                    <p className="p-4 text-gray-500">
                        No Menus found 
                    </p>
                )}
            </div>

        </main>
    )
}