
import pool from "@/lib/db";



export async function GET() {

  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  try {
    const result = await pool.query(
      "SELECT COUNT(*)::integer AS customer_count FROM customer"
    );

    return Response.json({
      success: true,
      message: "Connected to PostgreSQL",
      customerCount: result.rows[0].customer_count,
    });
  } catch (error) {
    console.error("Database connection test failed:", error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}
