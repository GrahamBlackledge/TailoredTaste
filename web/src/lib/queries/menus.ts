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

// public menu package display
export type PublicMenuPackage = {
    packageId: string;
    packageName: string;
    description: string | null;
    menuFilePath: string | null;
};


export async function getPublicMenuPackages(): Promise<PublicMenuPackage[]> {

    const result = await pool.query<PublicMenuPackage>(

        `SELECT
        
            package_id::text AS "packageId",
            package_name AS "packageName",
            description,
            menu_file_path AS "menuFilePath"
         FROM menu_package
         WHERE is_active = TRUE
         ORDER BY package_id ASC`
    );

    return result.rows;
}