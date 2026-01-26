'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Table, Database, Zap, ShieldCheck, Globe, Trash2 } from 'lucide-react';

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

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          
          {/* 模式切换 (高对比度设计) */}
          <div className="flex bg-slate-100 p-1">
            <button 
              onClick={() => setMode('excel')}
              className={`flex-1 py-3 text-center font-bold text-sm flex items-center justify-center gap-2 transition-all rounded-lg ${
                mode === 'excel' 
                  ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Table className={`h-4 w-4 ${mode === 'excel' ? 'text-white' : 'text-slate-500'}`} /> 
              Excel
            </button>
            <button 
              onClick={() => setMode('google-sheets')}
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

          <div className="p-6 md:p-8">
            <div className="mb-6">
              {/* Label 区域：包含清空按钮逻辑 */}
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Describe your problem
                </label>
                
                {description ? (
                  <button 
                    onClick={handleClear}
                    className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
                    title="Clear input"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Clear
                  </button>
                ) : (
                  // 回滚点：这里的提示语改回了 "Any language supported"
                  <span className="text-xs font-normal text-slate-400">Any language supported</span>
                )}
              </div>

              <textarea
                rows={3}
                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-800 p-4 border bg-slate-50 resize-none text-base transition-all focus:bg-white placeholder:text-slate-400"
                placeholder='e.g., "Sum column A if column B contains the word Sales" or "Calculate the number of days between today and the date in cell A1"'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className={`w-full flex items-center justify-center py-4 px-6 rounded-xl text-base font-bold text-white transition-all ${
                loading || !description.trim()
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
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

            {/* 结果显示区 */}
            {result && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Generated Formula</label>
                  {copied && <span className="text-xs text-green-600 font-bold flex items-center animate-pulse"><Check className="h-3 w-3 mr-1"/> Copied!</span>}
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
            )}
          </div>
        </div>

        {/* SEO 功能区 (底部) */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center text-slate-600">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Instant Generation</h3>
            <p className="text-sm">Stop wasting time on Google. Get the exact formula in seconds.</p>
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
            <p className="text-sm">Our AI understands natural language context, even if your description is vague.</p>
          </div>
        </div>
      </main>
    </div>
  );
}