'use client';

import React from 'react';
import { Table, Database } from 'lucide-react';

type ModeSwitcherProps = {
  mode: 'excel' | 'google-sheets';
  onModeChange: (mode: 'excel' | 'google-sheets') => void;
};

export default function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="flex bg-slate-100 p-1">
      <button
        onClick={() => onModeChange('excel')}
        className={`flex-1 py-3 text-center font-bold text-sm flex items-center justify-center gap-2 transition-all rounded-lg ${
          mode === 'excel'
            ? 'bg-green-600 text-white shadow-md transform scale-[1.02]'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
        }`}
      >
        <Table className={`h-4 w-4 ${mode === 'excel' ? 'text-white' : 'text-slate-500'}`} />
        Excel
      </button>
      <button
        onClick={() => onModeChange('google-sheets')}
        className={`flex-1 py-3 text-center font-bold text-sm flex items-center justify-center gap-2 transition-all rounded-lg ${
          mode === 'google-sheets'
            ? 'bg-green-600 text-white shadow-md transform scale-[1.02]'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
        }`}
      >
        <Database className={`h-4 w-4 ${mode === 'google-sheets' ? 'text-white' : 'text-slate-500'}`} />
        Google Sheets
      </button>
    </div>
  );
}
