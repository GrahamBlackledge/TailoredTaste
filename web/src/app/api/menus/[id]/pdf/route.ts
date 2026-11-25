
import { readFile } from "node:fs/promises";
import path from "node:path";
import pool from "@/lib/db";

// Uses GET to retrive file
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  if (
    !/^[1-9]\d{0,18}$/.test(id) ||
    BigInt(id) > BigInt("9223372036854775807")
  ) {
    return new Response("Invalid package ID", {
      status: 400,
    });
  }


  const result = await pool.query<{
    menuFilePath: string | null;
  }>(
    `SELECT
       menu_file_path AS "menuFilePath"
     FROM menu_package
     WHERE package_id = $1
       AND is_active = TRUE`,
    [id]
  );


  if (result.rows.length === 0) {
    return new Response("Menu package not found", {
      status: 404,
    });
  }

  const fileName = result.rows[0].menuFilePath;


  if (!fileName) {
    return new Response("No PDF uploaded", {
      status: 404,
    });
  }

  const validFileName =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.pdf$/i;

  if (!validFileName.test(fileName)) {
    return new Response("Invalid PDF filename", {
      status: 500,
    });
  }


  const uploadDir =
    process.env.MENU_UPLOAD_DIR ??
    path.join(process.cwd(), "storage", "menus");

  const filePath = path.join(uploadDir, fileName);

  try {
    const pdf = await readFile(filePath);
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="menu.pdf"',
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });

  } catch (error) {
    console.error("PDF retrieval failed:", error);

    return new Response("PDF unavailable", {
      status: 404,
    });
  }
}
