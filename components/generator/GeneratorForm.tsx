'use client';

import React from "react";

type GeneratorFormProps = {
  description: string;
  loading: boolean;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
  onClear: () => void;
};

export default function GeneratorForm({
  description,
  loading,
  onDescriptionChange,
  onGenerate,
  onClear,
}: GeneratorFormProps) {
  return (
    <div className="p-5 md:p-8">
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
          <span>Describe your problem</span>
          <span className="text-xs font-medium text-slate-400">
            Any language supported
          </span>
        </div>
        <textarea
          rows={3}
          className="w-full rounded-xl border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-slate-800 p-3 border bg-slate-50 resize-none text-base transition-all focus:bg-white placeholder:text-slate-400"
          placeholder="e.g., Sum column A if B is Sales"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onGenerate}
          disabled={loading || !description.trim()}
          className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl text-base font-bold text-white transition-all ${
            loading || !description.trim()
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Formula"}
        </button>
        <button
          onClick={onClear}
          className="flex-1 sm:flex-none py-3 px-4 rounded-xl text-base font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
