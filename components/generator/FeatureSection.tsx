'use client';

import React from 'react';
import { Zap, ShieldCheck, Globe } from 'lucide-react';

export default function FeatureSection() {
  return (
    <div className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8 text-slate-600">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 text-left md:flex-col md:text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center md:mx-auto md:mb-4">
          <Zap className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-1">
            Instant Text to Formula
          </h3>
          <p className="text-sm">
            Stop wasting time. Our <strong>AI Excel Formula Generator</strong>{' '}
            converts plain text into accurate syntax in seconds.
          </p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 text-left md:flex-col md:text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center md:mx-auto md:mb-4">
          <ShieldCheck className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-1">
            Free Spreadsheet Tools
          </h3>
          <p className="text-sm">
            100% free. No sign-up required. The best{' '}
            <strong>Google Sheets & Excel AI Helper</strong> for data analysis.
          </p>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 text-left md:flex-col md:text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center md:mx-auto md:mb-4">
          <Globe className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-1">
            Complex Logic Builder
          </h3>
          <p className="text-sm">
            Handle nested IFs, VLOOKUP, and REGEX. Our{' '}
            <strong>Formula Bot</strong> understands context better than
            templates.
          </p>
        </div>
      </div>
    </div>
  );
}
