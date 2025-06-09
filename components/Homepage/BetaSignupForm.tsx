"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";


export default function BetaSignupForm() {
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [customBusinessType, setCustomBusinessType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const { data, error } = await supabase
        .from("service_types")
        .select("label")
        .order("label", { ascending: true });

      if (!error && data) {
        setServiceTypes(data.map((item) => item.label));
      } else {
        console.error("Failed to load service types:", error);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (businessType === "Other" && customBusinessType) {
      const user = (await supabase.auth.getUser()).data.user;
      await supabase.from("service_types").insert([
        {
          label: customBusinessType,
          is_custom: true,
          created_by_user_id: user?.id ?? null
        }
      ]);
    }

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
        {serviceTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
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