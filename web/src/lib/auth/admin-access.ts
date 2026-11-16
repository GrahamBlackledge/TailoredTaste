import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getActiveAdminByEmail } from "@/lib/queries/admin";



export async function getCurrentAdmin() {

    const session = await auth();

    if (!session?.user?.email) {

    return null;
    }

    return await getActiveAdminByEmail(
        session.user.email
    );
}

export async function requireAdmin() {
    const admin = await getCurrentAdmin();

    if (!admin) {
        redirect("/admin/login");
    }

    return admin;
}