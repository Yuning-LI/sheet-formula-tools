'use client';

import React, { useState } from 'react';
import { Table } from 'lucide-react';
import GeneratorForm from '@/components/generator/GeneratorForm';
import ModeSwitcher from '@/components/generator/ModeSwitcher';
import ResultDisplay from '@/components/generator/ResultDisplay';
import FeatureSection from '@/components/generator/FeatureSection';

export default function Home() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'excel' | 'google-sheets'>('excel');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, mode }),
      });
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API response was not JSON");
      }

      const data = await response.json();
      
      if (data.error) {
        setResult('Error: ' + data.error);
      } else {
        setResult(data.formula);
      }
      
    } catch (error) {
      console.error("API Call Failed:", error);
      setResult('Error: Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDescription('');
    setResult('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Table className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">SheetFormula<span className="text-blue-600">.tools</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <span className="cursor-pointer hover:text-blue-600 transition-colors">Excel Formulas</span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors">Google Sheets</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* 标题区 */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Turn your text into <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Complex Formulas</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Stop struggling with syntax. Just describe what you need in <span className="font-medium text-slate-700">plain English</span>, and get the formula instantly.
          </p>
        </div>

        {/* 核心生成器卡片 */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all hover:shadow-2xl">
          
          <ModeSwitcher mode={mode} onModeChange={setMode} />
          <GeneratorForm
            description={description}
            loading={loading}
            onDescriptionChange={setDescription}
            onGenerate={handleGenerate}
            onClear={handleClear}
          />
          <ResultDisplay
            result={result}
            copied={copied}
            onCopiedChange={setCopied}
          />
        </div>

        {/* SEO 功能区 (底部) */}
        <FeatureSection />
      </main>
    </div>
  );
}
