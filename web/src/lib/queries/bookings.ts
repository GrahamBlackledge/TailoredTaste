
import  pool  from "../db";
import { requireAdmin } from "../auth/admin-access";
import type { CreateBookingInput } from "../validation/booking";


//  Type obj for booking linked to enquiry
export type BookingForEnquiry = {
  bookingId: string;
  status: "confirmed" | "completed" | "cancelled";
};

//check f enquiry has booking already
export async function getBookingForEnquiry(
  enquiryId: string
): Promise<BookingForEnquiry | null> {

  await requireAdmin();

  //checks enquiry id is valid BigInt
  if (
    !/^[1-9]\d{0,18}$/.test(enquiryId) ||
    BigInt(enquiryId) > BigInt("9223372036854775807")
  ) {
    return null;
  }

  //Find existing enquiry in db
  const result = await pool.query<BookingForEnquiry>(
    `SELECT
       booking_id::text AS "bookingId",
       status
     FROM booking
     WHERE enquiry_id = $1
     LIMIT 1`,
    [enquiryId]
  );

  
  // return booking
  return result.rows[0] ?? null;
}


    
   
      export async function createBookingFromEnquiry(
        data: CreateBookingInput
      ): Promise<string> {
        await requireAdmin();

        const client = await pool.connect();

        try {
  
          await client.query("BEGIN");

            const enquiryResult = await client.query<{
            customerId: string;
          }>(
            `SELECT customer_id::text AS "customerId"
            FROM enquiry
            WHERE enquiry_id = $1
            FOR UPDATE`,
            [data.enquiryId]
          );

          const enquiry = enquiryResult.rows[0];

          if (!enquiry) {
            throw new Error("Enquiry not found");
          }

          const existingBooking = await client.query(
            `SELECT booking_id
            FROM booking
            WHERE enquiry_id = $1
            LIMIT 1`,
            [data.enquiryId]
          );

          if (existingBooking.rows.length > 0) {
            throw new Error("This enquiry already has a booking");
          }

          const bookingResult = await client.query<{
            bookingId: string;
          }>(


            `INSERT INTO booking (
              customer_id,
              enquiry_id,
              event_date,
              guest_count,
              event_location,
              dietary_notes,
              internal_notes,
              status
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, 'confirmed')
            RETURNING booking_id::text AS "bookingId"`,
            [

              enquiry.customerId,
              data.enquiryId,
              data.eventDate,
              data.guestCount,
              data.eventLocation || null,
              data.dietaryNotes || null,
              data.internalNotes || null,
            ]
          );

      
          await client.query(
            `UPDATE enquiry
            SET status = 'closed'
            WHERE enquiry_id = $1`,
            [data.enquiryId]
          );

       
          await client.query("COMMIT");
          return bookingResult.rows[0].bookingId;
        } catch (error) {

            await client.query("ROLLBACK");
          throw error;

        } finally {

   
          client.release();
        }
      }
    

