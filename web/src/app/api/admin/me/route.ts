
import { getCurrentAdmin } from "@/lib/auth/admin-access";

// Return details of the authenticated administrator
export async function GET() {

    // Verify the current session and admin account
    const admin = await getCurrentAdmin();

    // Reject unauthorised requests
    if (!admin) {
        return Response.json(
            { error: "Unauthorized" },
            {
                status: 401,
                headers: { "Cache-Control": "no-store" },
            }
        );
    }

    // Return only non-sensitive administrator details
    return Response.json(
        {
            id: admin.admin_user_id,
            name: admin.full_name,
            email: admin.email,
            role: admin.role,
        },
        {
            status: 200,
            headers: { "Cache-Control": "no-store" },
        }
    );
}
