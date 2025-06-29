import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const scheduledPaymentId = segments[segments.length - 1];

  console.log("Fetching scheduled payment ID:", scheduledPaymentId);

  const { data: scheduled, error: scheduledError } = await supabase
    .from("scheduled_payments")
    .select("scheduled_for, product_id")
    .eq("id", scheduledPaymentId)
    .single();

  if (scheduledError || !scheduled) {
    console.error("Supabase error (scheduled_payments):", scheduledError);
    return NextResponse.json({ error: "Scheduled payment not found" }, { status: 404 });
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("name, business_id")
    .eq("id", scheduled.product_id)
    .single();

  if (productError || !product) {
    console.error("Supabase error (products):", productError);
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("name")
    .eq("id", product.business_id)
    .single();

  if (businessError) {
    console.error("Supabase error (businesses):", businessError);
  }

  return NextResponse.json({
    product_name: product.name,
    business_name: business?.name ?? null,
    preferred_payment_day: scheduled.scheduled_for,
  });
}