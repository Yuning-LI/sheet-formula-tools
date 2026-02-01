'use client';

import React from 'react';

export default function FAQSection() {
  return (
    <section className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6 text-slate-600">
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-2">
            How to generate an Excel formula from text?
          </h3>
          <p className="text-sm">
            Type your request in plain language and our AI converts it into a
            precise spreadsheet formula instantly.
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-2">
            Can ChatGPT create Excel or Google Sheets formulas?
          </h3>
          <p className="text-sm">
            Yes. Our assistant focuses on spreadsheet syntax to produce formulas
            that work in Excel and Google Sheets.
          </p>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-2">
            Is it free to use?
          </h3>
          <p className="text-sm">
            Absolutely. The generator is free with no sign-up required.
          </p>
        </div>
      </div>
    </section>
  );
}
