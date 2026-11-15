
import { Suspense } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <Suspense fallback={<p>Checking your session...</p>}>
                <AdminContent />
            </Suspense>
        </main>
    );
}

async function AdminContent() {

    // Get current login session
    const session = await auth();

    // Redirect for none logged in
    if (!session?.user) {
        redirect("/admin/login");
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

            <h1 className="text-3xl font-bold text-green-900 mb-4">
                Admin Dashboard
            </h1>

            <p className="text-gray-700 mb-2">
                Welcome, {session.user.name}
            </p>

            <p className="text-gray-500 mb-6">
                {session.user.email}
            </p>

           
            

            {/* Logout using a Server Action */}
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
