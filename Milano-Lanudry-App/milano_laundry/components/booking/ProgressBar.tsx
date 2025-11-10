// components/booking/ProgressBar.tsx
"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const steps = [
  { id: "service-selection", label: "Choose service", path: "/service-selection" },
  { id: "configure", label: "Configure", path: "" /* dynamic */ },
  { id: "checkout", label: "Checkout", path: "/checkout" },
];

export default function ProgressBar() {
  const pathname = usePathname() || "";
  const search = useSearchParams();
  const service = search?.get("service") ?? null;

  function currentIndex() {
    if (pathname.startsWith("/service-selection")) return 0;
    if (pathname.startsWith("/checkout")) return 2;
    // dynamic service page (e.g. /wash-fold)
    return 1;
  }

  const idx = currentIndex();

  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between gap-4">
        {steps.map((s, i) => {
          const isActive = i === idx;
          const isDone = i < idx;
          return (
            <li key={s.id} className="flex-1">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    isDone ? "bg-primary text-white" : isActive ? "bg-primary/80 text-white" : "bg-white border"
                  } shadow`}
                >
                  {i + 1}
                </div>
                <div className="ml-3">
                  <div className={`text-sm ${isActive ? "font-semibold" : "text-gray-600"}`}>
                    {s.label}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Thin line showing progress */}
      <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${((idx + 1) / steps.length) * 100}%`,
          }}
        />
      </div>
    </nav>
  );
}
