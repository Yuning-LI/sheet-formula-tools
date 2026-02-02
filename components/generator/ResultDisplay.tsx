'use client';

import React from "react";

type ResultDisplayProps = {
  result: string;
  copied: boolean;
  onCopiedChange: (value: boolean) => void;
};

export default function ResultDisplay({
  result,
  copied,
  onCopiedChange,
}: ResultDisplayProps) {
  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    onCopiedChange(true);
  };

  return (
    <div
      id="result-section"
      className="border-t border-slate-200 p-5 md:p-8 bg-slate-50"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">Result</span>
        <button
          onClick={handleCopy}
          disabled={!result}
          className={`text-sm font-semibold px-3 py-2 rounded-lg border transition-colors ${
            result
              ? "border-slate-200 text-slate-600 hover:bg-white"
              : "border-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="min-h-[72px] bg-white border border-slate-200 rounded-xl p-4 text-slate-800 text-sm whitespace-pre-wrap">
        {result || "Your formula will appear here."}
      </div>
    </div>
  );
}
