
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

    const router = useRouter();

   
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const [loading, setLoading ] = useState(false);
    const [error, setError] = useState("");


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
     
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

        
            if (!result?.ok || result.error) {
                setError("Invalid email or password.");
                return;
            }

            router.replace("/admin");
            router.refresh();

        } catch {
            setError("Unable to sign in. Please try again.");

        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-900">
                        Tailored Taste
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Administration Portal
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-800"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-800"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Display login errors */}
                    {error && (
                        <p role="alert" className="text-red-600 text-sm">
                            {error}
                        </p>
                    )}

                    {/* Signin button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-900 text-white font-semibold py-3 rounded-lg hover:bg-green-800 disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <p className="text-center text-xs text-gray-400 mt-8">
                    Authorised administrators only
                </p>

            </div>
        </main>
    );
}
