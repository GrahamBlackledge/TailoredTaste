import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getMenuPackageById } from "@/lib/queries/menus"
import { saveMenuPackageChanges } from "../../actions";
import { changeMenuPackageStatus } from "../../actions";


type Props = {
    params: Promise<{ id: string}>;

};

export default function EditMenuPage({ params}: Props) {
    return(
        <Suspense fallback={<p className="p-8"> Loading package....</p>}>
            <EditMenuContent params={params} />

        </Suspense>
    );
}

async function EditMenuContent({ params }: Props) {
    
    const { id } = await params;

    if (

        !/^[1-9]\d{0,18}$/.test(id) ||
        BigInt(id) > BigInt("9223372036854775807")
        ) {
            notFound();
    }

    const menu = await getMenuPackageById(id);
    if (!menu) {
        notFound();
  }
 return (
    <main className="max-w-3xl mx-auto p-8">

      <Link
        href="/admin/menus" className="text-green-800 underline">
        Back to Menu Management
      </Link>

      <h1 className="text-3xl font-bold text-green-900 mt-6 mb-6">
        Edit Menu Package
      </h1>

      <form  action={saveMenuPackageChanges} className="border rounded-lg p-6 space-y-5">

        <input
          type="hidden"
          name="packageId"
          value={menu.packageId}/>

        <div>
          <label htmlFor="packageName" className="block mb-2">Package Name

          </label>


          <input
            id="packageName"
            name="packageName"
            type="text"
            defaultValue={menu.packageName}
            required
            className="w-full border rounded-lg p-3"/>
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={menu.description ?? ""}
            className="w-full border rounded-lg p-3"
            />
        </div>

        <div>
          <label htmlFor="pricePerPerson" className="block mb-2">
            Price per Person ($)
          </label>

          <input
            id="pricePerPerson"
            name="pricePerPerson"
            type="number"
            min="0"
            step="0.01"
            defaultValue={menu.pricePerPerson ?? ""}
            required
            className="w-full border rounded-lg p-3"/>
        </div>

        <div>
          <label htmlFor="minimumGuests" className="block mb-2">
            Minimum Guests
          </label>

          <input
            id="minimumGuests"
            name="minimumGuests"
            type="number"
            min="1"
            step="1"
            defaultValue={menu.minimumGuests ?? 1}
            required
            className="w-full border rounded-lg p-3"/>
        </div>

        <p className="text-sm text-gray-600">
          Current status: {menu.isActive ? "Active" : "Inactive"}
        </p>

        <button
          type="submit"
          className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 cursor-pointer">
          Save Changes
        </button>

      </form>
      <form action={changeMenuPackageStatus}  className="mt-6">

        <input
        type="hidden"
        name="packageId"
        value={menu.packageId} />

        <button
        type="submit" className={`px-6 py-3 rounded-lg text-white cursor-pointer ${
            menu.isActive 
            ? "bg-red-700 hover:bg-red-800" : "bg-green-800 hover:bg-green-900"}
            `}>
                {menu.isActive
                ? " Deactivate package"
                :   "Activate package"}

            </button>



      </form>

    </main>
  );
}