// app/(book)/checkout/page.tsx
"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/services";

export default function CheckoutPageClient() {
  const search = useSearchParams();
  const router = useRouter();

  const serviceSlug = search.get("service") ?? "";
  const quantityParam = search.get("quantity") ?? "1";
  const qty = Math.max(1, parseInt(quantityParam, 10) || 1);

  const service = getServiceBySlug(serviceSlug);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  if (!service) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">No service selected</h2>
        <p className="text-gray-600 mt-2">
          Please go back and pick a service.
        </p>
      </div>
    );
  }

  const total = service.price * qty;

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Fake submit - in real app call your API route
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/?order=success");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form onSubmit={placeOrder} className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Your details</h3>

        <label className="block text-sm">Full name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" required />

        <label className="block text-sm">Pickup address</label>
        <input value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" required />

        <div className="mt-4">
          <button disabled={loading} className="bg-primary text-white px-4 py-2 rounded">
            {loading ? "Placing..." : `Pay $${total.toFixed(2)} & Place Order`}
          </button>
        </div>
      </form>

      <aside className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold">Order summary</h4>
        <div className="mt-3 text-sm text-gray-600">
          <p><strong>Service:</strong> {service.name}</p>
          <p><strong>Quantity:</strong> {qty}</p>
          <p><strong>Unit price:</strong> ${service.price.toFixed(2)}</p>
          <hr className="my-3" />
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
        </div>
      </aside>
    </div>
  );
}
