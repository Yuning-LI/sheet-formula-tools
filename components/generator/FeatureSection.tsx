'use client';

import React from 'react';
import { Zap, ShieldCheck, Globe } from 'lucide-react';

export default function FeatureSection() {
  return (
    <div className="mt-20 grid md:grid-cols-3 gap-8 text-center text-slate-600">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="font-bold text-slate-900 mb-2">Instant Generation</h3>
        <p className="text-sm">
          Stop wasting time on Google. Get the exact formula in seconds.
        </p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="font-bold text-slate-900 mb-2">Free to Use</h3>
        <p className="text-sm">No sign-up required. Just type and generate.</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="h-6 w-6 text-purple-600" />
        </div>
        <h3 className="font-bold text-slate-900 mb-2">Smart Interpretation</h3>
        <p className="text-sm">
          Our AI understands natural language context, even if your description is vague.
        </p>
      </div>
    </div>
  );
}
