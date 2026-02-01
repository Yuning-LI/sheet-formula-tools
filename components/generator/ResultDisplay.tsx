'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';

type ResultDisplayProps = {
  result: string;
  copied: boolean;
  onCopiedChange: (copied: boolean) => void;
};

export default function ResultDisplay({
  result,
  copied,
  onCopiedChange,
}: ResultDisplayProps) {
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    onCopiedChange(true);
    setTimeout(() => onCopiedChange(false), 2000);
  };

  if (!result) return null;

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-slate-700">
          Generated Formula
        </label>
        {copied && (
          <span className="text-xs text-green-600 font-bold flex items-center animate-pulse">
            <Check className="h-3 w-3 mr-1" /> Copied!
          </span>
        )}
      </div>
      <div className="relative group">
        <div className="w-full bg-slate-900 rounded-xl p-5 font-mono text-base md:text-lg text-green-400 break-all border border-slate-800 shadow-inner">
          {result}
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700 group-hover:bg-slate-700"
          title="Copy to clipboard"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-500 text-center">
        * Verify the result before using in critical spreadsheets.
      </p>
    </div>
  );
}
