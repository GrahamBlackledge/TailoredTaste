
"use client";

import { useState } from "react";

type Customer = {
  customerId: string;
  fullName: string;
  email: string;
};

export default function CustomerFields({
  customers,
}: {
  customers: Customer[];
}) {

  const [customerId, setCustomerId] = useState("");

  return (
    <>
    
      <div>
        <label htmlFor="customerId" className="block font-medium mb-1">
          Customer
        </label>

        <select
          id="customerId"
          name="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="" disabled>Select customer</option>

          {customers.map((customer) => (
            <option
              key={customer.customerId}
              value={customer.customerId}
            >
              {customer.fullName} - {customer.email}
            </option>
          ))}

          <option value="new">+ New Customer</option>
        </select>
      </div>

   
      {customerId === "new" && (
        <fieldset className="border rounded-lg p-4 space-y-3">
          <legend className="font-semibold px-2">
            New Customer Details
          </legend>
          <input
            type="text"

            name="customerName"
            maxLength={150}
            placeholder="Full name"
            required
            className="w-full border rounded-lg p-3"/>

          <input

            type="email"
            name="customerEmail"
            maxLength={255}
            placeholder="Email address"
            required
            className="w-full border rounded-lg p-3"/>


          <input
            type="tel"
            name="customerPhone"
            maxLength={30}
            placeholder="Phone (optional)"
            className="w-full border rounded-lg p-3"/>
        </fieldset>
      )}
    </>
  );
}
