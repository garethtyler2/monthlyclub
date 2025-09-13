"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import BusinessProductManager from "@/components/dashboard/BusinessProductManager";

export default function ProductsPage() {
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: business } = await supabase
          .from("businesses")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (business) {
          setBusinessId(business.id);
        }
      }
      setLoading(false);
    };

    fetchBusinessId();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }

  if (!businessId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <span className="text-white text-lg">No business found for your account.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <BusinessProductManager businessId={businessId} />
        </div>
      </div>
    </div>
  );
}