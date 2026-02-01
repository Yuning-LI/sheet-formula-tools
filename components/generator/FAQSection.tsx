'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQSection() {
  return (
    <div className="mt-12 md:mt-20 max-w-2xl mx-auto">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          Everything you need to know about generating Excel formulas.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-8">
        <FAQItem
          question="How to generate a formula in Excel using AI?"
          answer="Simply type your request in plain English into our text box above (e.g., 'Sum column A if B is Sales'). Our AI engine translates your natural language into the correct Excel syntax instantly, ready to copy and paste."
        />
        <FAQItem
          question="Can ChatGPT generate Excel formulas?"
          answer="Yes! Our tool leverages similar Large Language Model (LLM) technology specifically optimized for spreadsheet logic. It's like having a dedicated ChatGPT just for Excel and Google Sheets tasks, without the need for complex prompting."
        />
        <FAQItem
          question="Is this AI Excel Formula Generator free?"
          answer="Absolutely. SheetFormula.tools is completely free to use. We believe in providing open access to productivity tools to help you work faster and smarter."
        />
        <FAQItem
          question="Does it work for Google Sheets?"
          answer="Yes. You can toggle between 'Excel' and 'Google Sheets' modes. While many formulas are similar, our AI handles specific differences tailored to each platform."
        />
      </div>
    </div>
  );
}
