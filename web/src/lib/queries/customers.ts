import pool from "../db";
import { requireAdmin } from "../auth/admin-access";

export type CustomerOption = {

    customerId: string;
    fullName: string;
    email: string;
    };

export async function getCustomers(): Promise<CustomerOption[]> {

    await requireAdmin();

    const result = await pool.query<CustomerOption>(
        `SELECT
        customer_id::text AS "customerId",
        full_name AS "fullName",
        email
        FROM customer
        ORDER BY full_name ASC
        LIMIT 100`

          

    );

    return result.rows;

    }