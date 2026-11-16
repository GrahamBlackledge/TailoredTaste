
import pg from "pg";
import argon2 from "argon2";
import { loadEnvFile } from "node:process";


loadEnvFile(".env.local");


const [fullName, email] = process.argv.slice(2);

if (!fullName || !email) {
  console.error("Please provide a name and email.");
  process.exit(1);
}


let password = "";

for await (const chunk of process.stdin) {
  password += chunk.toString();
}


password = password.replace(/\r?\n$/, "");

if (password.length < 14) {
  console.error("Password must be at least 14 characters.");
  process.exit(1);
}


const passwordHash = await argon2.hash(password, {
  type: argon2.argon2id,
});

password = "";


const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try {

  const result = await pool.query(
    `INSERT INTO admin_user
      (full_name, email, password_hash, role, is_active)
     VALUES ($1, $2, $3, 'admin', TRUE)
     RETURNING admin_user_id, full_name, email, role`,
    [fullName, email.toLowerCase(), passwordHash]
  );

  console.log("Administrator created successfully!");
  console.log(result.rows[0]);

} catch (error) {
  console.error(
    error.code === "23505"
      ? "An administrator with this email already exists."
      : `Account creation failed: ${error.message}`
  );
  process.exitCode = 1;

} finally {
  await pool.end();
}
