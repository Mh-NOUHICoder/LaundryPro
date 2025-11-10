// app/(book)/[serviceSlug]/page.tsx
import { getServiceBySlug } from "@/lib/data/services";
import Link from "next/link";

type Props = {
  params: { serviceSlug: string };
};

export default function ServiceConfigurePage({ params }: Props) {
  const { serviceSlug } = params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Service not found</h2>
        <p className="text-gray-600 mt-2">Please go back and choose a valid service.</p>
        <div className="mt-4">
          <Link href="/service-selection" className="underline">
            Choose service
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold">{service.name}</h2>
      <p className="text-gray-600 mt-2">{service.short}</p>

      {/* Simple config controls */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-medium">Quantity (bags)</label>
          <div className="mt-2">
            <input
              id="quantity"
              name="quantity"
              type="number"
              defaultValue={1}
              min={1}
              className="w-24 rounded border px-2 py-1"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-medium">Pickup type</label>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-1 border rounded">Door Pickup</button>
            <button className="px-3 py-1 border rounded">Drop-off</button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Link
          href={`/checkout?service=${service.slug}&quantity=1`}
          className="inline-block bg-primary text-white px-5 py-2 rounded shadow"
        >
          Continue to checkout
        </Link>

        <Link href="/service-selection" className="text-sm text-gray-600 underline">
          Back
        </Link>
      </div>
    </section>
  );
}
