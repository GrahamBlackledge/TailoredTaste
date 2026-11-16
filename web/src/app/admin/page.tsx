
import { Suspense } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/admin-access";

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <Suspense fallback={<p>Checkin admin access...</p>}>
                <AdminDashboard />
            </Suspense>
        </main>
    );
}

async function AdminDashboard() {

    // Verify admin
    const admin = await requireAdmin();

    

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

            <h1 className="text-3xl font-bold text-green-900 mb-4">
                Admin Dashboard
            </h1>

            <p className="mb-2">
                Welcome, {admin.full_name}
            </p>

            <p className="text-gray-500 mb-2">
                {admin.email}
            </p>

            <p className="text-gray-500 mb-6">
                Role: {admin.role}
            </p>

            <p className="mb-8">
                Tailored Taste administration dashboard.
            </p>

            {/* Sign out and return to login */}
            <form
                action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/admin/login" });
                }}
            >
                <button
                    type="submit"
                    className="bg-green-900 text-white px-5 py-3 rounded-lg hover:bg-green-800 cursor-pointer"
                >
                    Sign Out
                </button>
            </form>

        </div>
    );
}