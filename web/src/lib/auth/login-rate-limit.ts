
import pool from "@/lib/db";


const MAX_ATTEMPTS = 5;


export async function allowLoginAttempt(email: string): Promise<boolean> {

    const result = await pool.query<{ attempt_count: number }>(
        `INSERT INTO admin_login_attempt
            (email, attempt_count, window_started_at)
         VALUES ($1, 1, NOW())

         ON CONFLICT (email)
         DO UPDATE SET

            attempt_count = CASE
                WHEN admin_login_attempt.window_started_at
                     <= NOW() - INTERVAL '15 minutes'
                THEN 1
                ELSE LEAST(admin_login_attempt.attempt_count + 1, 6)
            END,

            window_started_at = CASE
                WHEN admin_login_attempt.window_started_at
                     <= NOW() - INTERVAL '15 minutes'
                THEN NOW()
                ELSE admin_login_attempt.window_started_at
            END

         RETURNING attempt_count`,
        [email]
    );

    const attempts = result.rows[0]?.attempt_count ?? 6;

   
    return attempts <= MAX_ATTEMPTS;
}


export async function clearLoginAttempts(email: string): Promise<void> {

    await pool.query(
        `DELETE FROM admin_login_attempt
         WHERE email = $1`,
        [email]
    );
}
