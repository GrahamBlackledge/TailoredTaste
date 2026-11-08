
import pool from "@/lib/db";
import type { EnquiryInput } from "@/lib/validation/enquiry";

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
