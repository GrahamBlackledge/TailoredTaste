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
            <div className="border rounded-lg overflow-hidden ">

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

            <section className="border rounded-lg p-6 mb-8 mt-8">
                <h2 className="text-xl font-bold text-green-900 mb-5">
                    Upload Menu

                </h2>

                <form 
                action="/api/admin/menus/upload"
                method="POST"
                encType="multipart/form-data"
                className="space-y-5">

                    <div>
                        <label htmlFor="packageId" className="block font-medium mb-2">
                            Menu package
                        </label>

                        <select 
                        id="packageId"
                        name="packageId"
                        required
                        defaultValue=""
                        className="w-full border rounded-lg p-3">

                            <option value="">
                                Select menu
                            </option>

                            {menus.map((menu) => (
                                <option key={menu.packageId}
                                value={menu.packageId}>
                                    {menu.packageName}
                                </option>
                            ))}


                        </select>

                    </div>
                    <div>
                        <label htmlFor="pdf" className="block font-mediu, mb-2">
                            Menu file
                        </label>
                        <input 

                        type="file"
                        id="pdf"
                        name="pdf"
                        accept=".pdf,application/pdf"
                        required
                        className="w-full border rounded-lg p-3"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            PDF files only, Max size 10MB. </p>



                    </div>

                    <button type="submit" className="bg-green-900 text-white px-5 py-3 rounded-lg hover:bg-green-800 cursor-pointer">Upload Menu</button>



                </form>


            </section>        


        </main>
    )
}