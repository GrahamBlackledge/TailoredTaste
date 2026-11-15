import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import argon2 from  "argon2";

import { getAdminByEmail } from "./lib/queries/admin";


// Validates login info
const loginSchema =z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(1).max(1024),


});

//store login session with token for 8 hours
export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 8,
    },


providers: [
    Credentials({
        credentials: { 
            email: { label: "Email", type: "email"},
            password: { label: "Password ", type: "password"}
        },


    //validate credentials
    async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
            return null;
        }

        const{ email , password } = parsed.data;


            // find admin, check is admin
        const admin = await getAdminByEmail(email);

        if (!admin || !admin.is_active) {
            return null;
        }

        // verifyu against password hash
        const validPassword = await argon2.verify(
            admin.password_hash,
            password
        )
        if (!validPassword) {
            return null; 
        }


        // return authenticated admin
        return {
            id: String(admin.admin_user_id),
            name: admin.full_name,
            email: admin.email,
        };
    },

    }),  

],      
});     
