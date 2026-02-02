'use client';

import React from "react";

type ModeSwitcherProps = {
  mode: "excel" | "google-sheets";
  onModeChange: (mode: "excel" | "google-sheets") => void;
};

export default function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="flex border-b border-slate-200">
      {[
        { label: "Excel", value: "excel" as const },
        { label: "Google Sheets", value: "google-sheets" as const },
      ].map((tab) => (
        <button
          key={tab.value}
          onClick={() => onModeChange(tab.value)}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            mode === tab.value
              ? "text-green-600 border-b-2 border-green-600 bg-white"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
