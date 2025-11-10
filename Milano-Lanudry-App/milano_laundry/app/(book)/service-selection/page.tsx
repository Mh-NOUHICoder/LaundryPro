// app/(book)/service-selection/page.tsx
import Link from "next/link";
import { services } from "@/lib/data/services";

export default function ServiceSelectionPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Choose a Service</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <article key={s.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600">{s.short}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg font-bold">${s.price.toFixed(2)}</div>
              <Link
                href={`/${s.slug}`}
                className="inline-block px-4 py-2 border rounded hover:bg-gray-100"
              >
                Select
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
