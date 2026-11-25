
import { NextResponse } from "next/server";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import pool from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin-access";

export const runtime = "nodejs";


const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {

 
  await requireAdmin();

 
  const contentLength = Number(
    request.headers.get("content-length") ?? 0
  );

  if (contentLength > 11 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Upload request is too large" },
      { status: 413 }
    );
  }

   let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid upload request" },
      { status: 400 }
    );
  }

  const packageId = formData.get("packageId");
  const pdf = formData.get("pdf");


  if (
    typeof packageId !== "string" ||
    !/^[1-9]\d{0,18}$/.test(packageId) ||
    BigInt(packageId) > BigInt("9223372036854775807")
  ) {
    return NextResponse.json(
      { error: "Invalid menu package" },
      { status: 400 }
    );
  }


  if (!(pdf instanceof File)) {
    return NextResponse.json(
      { error: "No PDF file selected" },
      { status: 400 }
    );
  }

  if (pdf.size === 0 || pdf.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "PDF must be between 1 byte and 10 MB" },
      { status: 400 }
    );
  }

  if (
    !pdf.name.toLowerCase().endsWith(".pdf") ||
    (pdf.type && pdf.type !== "application/pdf")
  ) {
    return NextResponse.json(
      { error: "Only PDF files are allowed" },
      { status: 400 }
    );
  }


  const buffer = Buffer.from(await pdf.arrayBuffer());

  if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    return NextResponse.json(
      { error: "File is not a valid PDF format" },
      { status: 400 }
    );
  }


  const fileName = `${randomUUID()}.pdf`;


  const uploadDir =
    process.env.MENU_UPLOAD_DIR ??
    path.join(process.cwd(), "storage", "menus");

  const filePath = path.join(uploadDir, fileName);

  let fileSaved = false;

  try {

    await mkdir(uploadDir, {
      recursive: true,
      mode: 0o700,
    });

   
    await writeFile(filePath, buffer, {
      flag: "wx",
      mode: 0o600,
    });

    fileSaved = true;


    const result = await pool.query(
      `UPDATE menu_package
       SET menu_file_path = $1
       WHERE package_id = $2
       RETURNING package_id`,
      [fileName, packageId]
    );

    if (result.rowCount === 0) {
      await unlink(filePath);
      return NextResponse.json(
        { error: "Menu package not found" },
        { status: 404 }
      );
    }

  } catch (error) {

   
    if (fileSaved) {
      await unlink(filePath).catch(() => {});
    }

    console.error("PDF upload failed:", error);

    return NextResponse.json(
      { error: "Unable to save PDF" },
      { status: 500 }
    );
  }


  return NextResponse.redirect(
    new URL("/admin/menus?uploaded=1", request.url),
    303
  );
}
