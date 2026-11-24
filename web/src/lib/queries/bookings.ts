
import  pool  from "../db";
import { requireAdmin } from "../auth/admin-access";
import type { CreateBookingInput } from "../validation/booking";
import type { UpdateBookingInput } from "../validation/booking";
import type { ManualBookingInput } from "../validation/booking";



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

      export type BookingListItem = {
        bookingId: string;
        customerName: string;
        eventDate: string;
        guestCount: number;
        eventLocation: string | null;
        status: string;
        packageName: string | null;

      };

      export type BookingDetails = BookingListItem & {
        customerEmail: string;
        customerPhone: string | null;
        enquiryId: string | null;
        dietaryNotes: string | null;
        internalNotes: string | null;

      };

      export async function getBookings(): Promise<BookingListItem[]> {
        await requireAdmin();

        const result = await pool.query<BookingListItem>(
          `SELECT
          
              b.booking_id::text AS "bookingId",
              c.full_name AS "customerName",
              TO_CHAR(b.event_date, 'YYYY-MM-DD') AS "eventDate",
              b.guest_count AS "guestCount",
              b.event_location AS "eventLocation",
              b.status,
              m.package_name AS "packageName"
            FROM booking b
            JOIN customer c ON b.customer_id = c.customer_id
            LEFT JOIN menu_package m ON b.package_id = m.package_id
            ORDER BY b.event_date ASC, b.booking_id ASC`

        );
        return result.rows;

      }
      export async function getBookingById(
          bookingId: string
        ): Promise<BookingDetails | null> {
          await requireAdmin();

         
          if (
            !/^[1-9]\d{0,18}$/.test(bookingId) ||
            BigInt(bookingId) > BigInt("9223372036854775807")
          ) {
            return null;
          }

          const result = await pool.query<BookingDetails>(
            `SELECT
              b.booking_id::text AS "bookingId",
              b.enquiry_id::text AS "enquiryId",
              c.full_name AS "customerName",
              c.email AS "customerEmail",
              c.phone AS "customerPhone",
              TO_CHAR(b.event_date, 'YYYY-MM-DD') AS "eventDate",
              b.guest_count AS "guestCount",
              b.event_location AS "eventLocation",
              b.status,
              b.dietary_notes AS "dietaryNotes",
              b.internal_notes AS "internalNotes",
              m.package_name AS "packageName"
            FROM booking b
            JOIN customer c ON b.customer_id = c.customer_id
            LEFT JOIN menu_package m ON b.package_id = m.package_id
            WHERE b.booking_id = $1
            LIMIT 1`,
            [bookingId]
          );

          return result.rows[0] ?? null;

        }


        
  // Update an existing booking

export async function updateBooking(
  data: UpdateBookingInput
): Promise<boolean> {

  await requireAdmin();


  const result = await pool.query(
    `UPDATE booking
     SET
       event_date = $2,
       guest_count = $3,
       event_location = $4,
       dietary_notes = $5,
       internal_notes = $6,
       status = $7
     WHERE booking_id = $1`,
    [

      data.bookingId,
      data.eventDate,
      data.guestCount,
      data.eventLocation || null ,
      data.dietaryNotes || null,
      data.internalNotes || null,
      data.status,
    ]
  );


  return result.rowCount === 1;
}


    


