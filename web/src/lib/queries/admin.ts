
import pool from "@/lib/db";


export type AdminUser = {
  admin_user_id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: "owner" | "staff";
  is_active: boolean;
};


export async function getAdminByEmail(email: string) {
  const result = await pool.query<AdminUser>(
    `SELECT
       admin_user_id,
       full_name,
       email,
       password_hash,
       role,
       is_active
     FROM admin_user
     WHERE LOWER(email) = LOWER($1)
     LIMIT 1`,
    [email]
  );
  


  return result.rows[0] ?? null;
}

export type ActiveAdmin = Pick<
    AdminUser,
    "admin_user_id" | "full_name" | "email" | "role"
>;

export async function getActiveAdminByEmail(email: string) {

    const result = await pool.query<ActiveAdmin>(
        `SELECT
            admin_user_id,
            full_name,
            email,
            role
         FROM admin_user
         WHERE LOWER(email) = LOWER($1)
         AND is_active = TRUE
          LIMIT 1`,
        [email]
    );

    return result.rows[0] ?? null;
}
