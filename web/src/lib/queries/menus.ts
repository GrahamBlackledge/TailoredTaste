import pool from "../db"
import { requireAdmin } from "../auth/admin-access"
import type { CreateMenuPackageInput } from "../validation/menu";


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

export async function insertMenuPackage(
    data: CreateMenuPackageInput
): Promise<string> {

    await requireAdmin();

    const result = await pool.query<{
        packageId: string;}>(
            `INSERT INTO menu_package (
            package_name,
            description,
            price_per_person,
            minimum_guests,
            is_active
            )   
            VALUES ($1, $2, $3, $4, TRUE)
            RETURNING  package_id::text AS "packageId"`,
            [
                data.packageName,
                data.description || null,
                data.pricePerPerson,
                data.minimumGuests,


            ]
        );
        return result.rows[0].packageId; 
}

export type MenuPackageDetails = {
    packageId: string;
    packageName: string;
    description: string | null;
    pricePerPerson: string | null;
    minimumGuests: number | null;
    isActive: boolean;

};

export async function getMenuPackageById(
    packageId: string): Promise<MenuPackageDetails | null> {

        await requireAdmin();

        const result = await pool.query<MenuPackageDetails>(
            `SELECT
            package_id::text AS "packageId",
            package_name AS "packageName",
            description,
            price_per_person::text AS "pricePerPerson",
            minimum_guests AS "minimumGuests",
            is_active AS "isActive"
            FROM menu_package
            WHERE package_id = $1`,
            [packageId]
        );

        return result.rows[0] ?? null;


    }
