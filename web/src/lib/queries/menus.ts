import pool from "../db"
import { requireAdmin } from "../auth/admin-access"

export type MenuPackage = {
    packageId: string;
    packageName: string;
    menuFilePath:string | null;
    isActive: boolean;
};


export async function getMenuPackages(): Promise<MenuPackage[]> {

    await requireAdmin();

    const result = await pool.query<MenuPackage>(
        `SELECT 
            package_id AS "packageId",
            package_name AS "packageName",
            menu_file_path AS "menuFilePath",
            is_active AS "isActive"
        FROM menu_package
        ORDER BY package_name ASC
                        `

    );

    return result.rows;
}