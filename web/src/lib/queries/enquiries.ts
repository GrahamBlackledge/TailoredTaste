
import pool from "@/lib/db";
import type { EnquiryInput } from "@/lib/validation/enquiry";

import { requireAdmin } from "../auth/admin-access";

// type object for enquiries in admin dashbaoard
export type EnquiryListItem = {
  enquiryId: string;
  customerName: string;
  customerEmail: string;
  eventDate: string;
  guestCount: number;
  eventLocation: string | null;
  status: string | null;
  createdAt: Date | null;


};


export type EnquiryDetail = EnquiryListItem & {

  customerPhone: string | null;
  dietaryNotes: string  | null;


};


export async function createEnquiry(data: EnquiryInput) {
  const client = await pool.connect();

  try {
    // start  database transaction
    await client.query("BEGIN");

    // Creates  customer
    const customerResult = await client.query(
      `INSERT INTO customer (full_name, email, phone)
       VALUES ($1, $2, $3)
       RETURNING customer_id`,
      [data.fullName, data.email, data.phone ?? null]
    );

    const customerId = customerResult.rows[0].customer_id;

    // Create the enquiry linked to the customer
    const enquiryResult = await client.query(
      `INSERT INTO enquiry (
         customer_id,
         event_date,
         guest_count,
         event_location,
         dietary_notes
       )
       VALUES ($1, $2, $3, $4, $5)
       RETURNING enquiry_id`,
      [
        customerId,
        data.eventDate,
        data.guestCount,
        data.eventLocation ?? null,
        data.dietaryNotes ?? null,
      ]
    );

    // Save both records
    await client.query("COMMIT");

    return {
      enquiryId: enquiryResult.rows[0].enquiry_id,
    };

  } catch (error) {
    // Undo both inserts if something fails
    await client.query("ROLLBACK");
    throw error;

  } finally {
    // Returns connection to the pool
    client.release();
  }
}


    export async function getEnquiries(): Promise<EnquiryListItem[]> {

      await requireAdmin();
      const result = await pool.query<EnquiryListItem> (
        `SELECT
              e.enquiry_id::text AS "enquiryId",
              c.full_name AS  "customerName",
              c.email AS "customerEmail",
              TO_CHAR(e.event_date, 'YYYY-MM-DD') AS "eventDate",
              e.guest_count AS "guestCount",
              e.event_location AS "eventLocation",
              e.status,
              e.created_at AS "createdAt"
          FROM enquiry e
          JOIN customer c
            ON e.customer_id = c.customer_id
          ORDER BY e.created_at DESC, e.enquiry_id DESC
          LIMIT 50
              `
      );
      return result.rows;
  }



  export async function getEnquiryById(
    enquiryId:string ) : Promise<EnquiryDetail | null> {
      await requireAdmin();
       if (
        !/^[1-9]\d*$/.test(enquiryId) ||
        BigInt(enquiryId) > BigInt("9223372036854775807")
      ) {
        return null;
      }

       const result = await pool.query<EnquiryDetail>(
    `SELECT
       e.enquiry_id::text AS "enquiryId",
       c.full_name AS "customerName",
       c.email AS "customerEmail",
       c.phone AS "customerPhone",
       TO_CHAR(e.event_date, 'YYYY-MM-DD') AS "eventDate",
       e.guest_count AS "guestCount",
       e.event_location AS "eventLocation",
       e.dietary_notes AS "dietaryNotes",
       e.status,
       e.created_at AS "createdAt"
     FROM enquiry e
     JOIN customer c
       ON e.customer_id = c.customer_id
     WHERE e.enquiry_id = $1
     LIMIT 1`,
    [enquiryId]
       );

    return result.rows[0] ?? null;
 

    }
  




