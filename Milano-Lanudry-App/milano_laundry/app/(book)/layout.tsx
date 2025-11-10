// app/(book)/layout.tsx
import React from "react";
import ProgressBar from "@/components/booking/ProgressBar";

export const metadata = {
  title: "Book a Service",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* Minimal top area */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-xl font-semibold">Book a Service</h1>
          </div>
        </header>

        {/* Progress bar lives inside the booking layout */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <ProgressBar />
        </div>

        <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>

        <footer className="max-w-4xl mx-auto px-4 py-10 text-sm text-gray-500">
          <p>Need help? Contact support@example.com</p>
        </footer>
      </body>
    </html>
  );
}
