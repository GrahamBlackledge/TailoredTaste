
"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";

type ApiResponse = {
  success?: boolean;
  message?: string;
  enquiryId?: number | string;
  errors?: { field: string; message: string }[];
};


const parseErr = (errs?: { field: string; message: string }[]) => {
  if (!errs) return "";
  return errs.map(e => `${e.field}: ${e.message}`).join("; ");
};

// Keep track of form submission and messages
export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const inputStyle = "mt-1 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900";
  const labelStyle = "block text-sm font-medium text-gray-800";

  // Stop page refreshing when form is submitted
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fData = new FormData(form);

    const enquiry = {
      fullName: String(fData.get("fullName") ?? "").trim(),
      email: String(fData.get("email") ?? "").trim(),
      phone: String(fData.get("phone") ?? "").trim(),
      eventDate: String(fData.get("eventDate") ?? ""),
      guestCount: Number(fData.get("guestCount")),
      eventLocation: String(fData.get("eventLocation") ?? "").trim(),
      dietaryNotes: String(fData.get("dietaryNotes") ?? "").trim(),
    };

    setLoading(true);
    setError("");
    setShowSuccess(false);

    //Send the enquiry data to the API endpoint
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiry),
      });

      const data = (await res.json()) as ApiResponse;
      

      if (!res.ok || data.success === false) {
        const details = parseErr(data.errors);
        setError(details || data.message || "Submission failed");
        return;
      }

      setShowSuccess(true);
        form.reset();

        setTimeout(() => {
        setShowSuccess(true);  
        router.replace("/");
      }, 2000);
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  // Enquiry form and user input
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold">Your Details</h2>

      <div>
        <label htmlFor="fullName" className={labelStyle}>
          Full Name *
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          minLength={2}
          maxLength={150}
          className={inputStyle}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelStyle}>
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            className={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelStyle}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={30}
            className={inputStyle}
          />
        </div>
      </div>

      <h2 className="pt-4 text-xl font-semibold">Event Details</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className={labelStyle}>
            Event Date *
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="guestCount" className={labelStyle}>
            Number of Guests *
          </label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            min={1}
            step={1}
            required
            className={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="eventLocation" className={labelStyle}>
          Event Location
        </label>
        <input
          id="eventLocation"
          name="eventLocation"
          type="text"
          maxLength={255}
          placeholder="e.g. Auckland"
          className={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="dietaryNotes" className={labelStyle}>
          Dietary Requirements / Allergies
        </label>
        <textarea
          id="dietaryNotes"
          name="dietaryNotes"
          rows={4}
          maxLength={2000}
          placeholder="Please provide any dietary requirements or allergies."
          className={inputStyle}
        />
        <p className="mt-1 text-sm text-gray-600">
          Any allergies will need to be confirmed before the event.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}

      {showSuccess && (
  <div
    role="status"
    aria-live="polite"
    className="fixed top-8 left-1/2 -translate-x-1/2 z-50
              w-[90%] max-w-md bg-white border border-green-200
               rounded-xl shadow-xl px-6 py-5 text-center">
                 <p className="text-xl font-semibold text-green-900">
                    Enquiry Submitted
                  </p>

               </div>
)}


      <button
        type="submit"
        disabled={loading || showSuccess}
        className="rounded-lg bg-gray-900 px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
