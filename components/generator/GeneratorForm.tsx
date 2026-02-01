'use client';

import React from 'react';
import { ArrowRight, Trash2 } from 'lucide-react';

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
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <label className="block text-sm font-semibold text-slate-700">
            Describe your problem
          </label>
          {description ? (
            <button
              onClick={onClear}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
              title="Clear input"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
          ) : (
            <span className="text-xs font-normal text-slate-400">
              Any language supported
            </span>
          )}
        </div>
        <textarea
          rows={3}
          className="w-full rounded-xl border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-slate-800 p-3 border bg-slate-50 resize-none text-base transition-all focus:bg-white placeholder:text-slate-400"
          placeholder='e.g., "Sum column A if B is Sales"'
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        ></textarea>
      </div>
      <button
        onClick={onGenerate}
        disabled={loading || !description.trim()}
        className={`w-full flex items-center justify-center py-4 px-6 rounded-xl text-base font-bold text-white transition-all ${
          loading || !description.trim()
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Generating Formula...
          </>
        ) : (
          <>
            Generate Formula <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );
}
