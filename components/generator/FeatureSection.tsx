'use client';

import React from "react";

const features = [
  {
    title: "Instant Text to Formula",
    description:
      "Stop wasting time. Our AI Excel Formula Generator converts plain text into accurate syntax in seconds.",
  },
  {
    title: "Free Spreadsheet Tools",
    description:
      "100% free. No sign-up required. The best Google Sheets & Excel AI Helper for data analysis.",
  },
  {
    title: "Complex Logic Builder",
    description:
      "Handle nested IFs, VLOOKUP, and REGEX. Our Formula Bot understands context better than templates.",
  },
];

export default function FeatureSection() {
  return (
    <section className="mt-12 md:mt-16">
      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
