"use server";


import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin-access";
import { createMenuPackageSchema } from "@/lib/validation/menu";
import { insertMenuPackage } from "@/lib/queries/menus";
import { updateMenuPackageSchema } from "@/lib/validation/menu";
import { updateMenuPackage } from "@/lib/queries/menus";



export async function createMenuPackage(formData: FormData) {

    await requireAdmin();

    const result = createMenuPackageSchema.safeParse({

        packageName: formData.get("packageName"),
        description: formData.get("description") ?? "",
        pricePerPerson: formData.get("pricePerPerson"),
        minimumGuests: formData.get("minimumGuests"),

    });

    if (!result.success) {
        console.error(result.error.flatten());
        throw new Error("Invalid details")

    }

    await insertMenuPackage(result.data);

    revalidatePath("/admin/menus");
    revalidatePath("/menus");

    redirect("/admin/menus?created=1");


}

export async function saveMenuPackageChanges(formData: FormData) {
    await requireAdmin()

    const result = updateMenuPackageSchema.safeParse({

        packageId: formData.get("packageId"),
        packageName: formData.get("packageName"),
        description: formData.get("description") ?? "",
        pricePerPerson: formData.get("pricePerPerson"),
        minimumGuests: formData.get("minimumGuests"),

    });

    if (!result.success) {
        console.error(result.error.flatten());
        throw new Error("Invalid menu package information");
        }

      const updated = await updateMenuPackage(result.data);
      
      if (!updated) {
        throw new Error(" package not found")
      }

      revalidatePath("/admin/menus");
      revalidatePath("/menus");
      revalidatePath("/admin/menus/$ ")

      redirect("/admin/menus?updated=1");



}
