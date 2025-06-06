"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";


export default function BetaSignupForm() {
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [customBusinessType, setCustomBusinessType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const finalBusinessType = businessType === "Other" ? customBusinessType : businessType;

    const { error } = await supabase.from("beta_signups").insert([{ email, business_type: finalBusinessType }]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setEmail("");
      setBusinessType("");
      setCustomBusinessType("");
      setStatus("success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 space-y-4">
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <select
        required
        value={businessType}
        onChange={(e) => {
          const value = e.target.value;
          setBusinessType(value);
          if (value !== "Other") setCustomBusinessType("");
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded"
      >
        <option value="" disabled>Select your business type</option>
        <option value="Hairdresser">Hairdresser</option>
        <option value="Barber">Barber</option>
        <option value="Beautician">Beautician</option>
        <option value="Massage Therapist">Massage Therapist</option>
        <option value="Cleaner">Cleaner</option>
        <option value="Gardener">Gardener</option>
        <option value="Dog Walker">Dog Walker</option>
        <option value="Dog Groomer">Dog Groomer</option>
        <option value="Window Cleaner">Window Cleaner</option>
        <option value="Mobile Car Washer">Mobile Car Washer</option>
        <option value="Plumber">Plumber</option>
        <option value="Electrician">Electrician</option>
        <option value="Handyman">Handyman</option>
        <option value="Personal Trainer">Personal Trainer</option>
        <option value="Tutor">Tutor</option>
        <option value="Lawn Care">Lawn Care</option>
        <option value="Home Organizer">Home Organizer</option>
        <option value="Pest Control">Pest Control</option>
        <option value="Pool Cleaner">Pool Cleaner</option>
        <option value="Mobile Mechanic">Mobile Mechanic</option>
        <option value="Laundry/Ironing Service">Laundry/Ironing Service</option>
        <option value="Mobile Nail Technician">Mobile Nail Technician</option>
        <option value="Pet Sitting">Pet Sitting</option>
        <option value="Other">Other</option>
      </select>
      {businessType === "Other" && (
        <input
          type="text"
          required
          placeholder="Please specify your business type"
          value={customBusinessType}
          onChange={(e) => setCustomBusinessType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      )}
      <button
        type="submit"
        className="w-full hero-button-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Join The Beta"}
      </button>
      {status === "success" && <p className="text-green-600 text-sm">Thanks! We'll be in touch soon.</p>}
      {status === "error" && <p className="text-red-600 text-sm">Something went wrong. Try again.</p>}
    </form>
  );
}