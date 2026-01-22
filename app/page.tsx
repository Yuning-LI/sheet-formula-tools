'use client';

import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Table, Database, Zap, ShieldCheck, Globe } from 'lucide-react';

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
      
      // 处理非 JSON 响应（防止报错）
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
      console.error("API Call Failed (Expected in Preview):", error);
      // --- 模拟数据 (Mock) ---
      // 这一步是为了让您在 Canvas 预览中也能看到效果
      // 在本地运行时，如果 API 没通，您也会看到这个模拟结果，方便调试界面
      setTimeout(() => {
        if (mode === 'excel') {
          setResult('=IF(A1>100, "High", "Low")');
        } else {
          setResult('=VLOOKUP(A2, Sheet2!A:B, 2, FALSE)');
        }
      }, 1000);
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
            <Zap className="h-3 w-3" />
            <span>Powered by DeepSeek AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Turn your text into <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Complex Formulas</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Stop struggling with syntax. Just describe what you need in plain English (or Chinese), and get the formula instantly.
          </p>
        </div>

        {/* 核心生成器卡片 */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all hover:shadow-2xl">
          
          {/* 模式切换 */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setMode('excel')}
              className={`flex-1 py-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-all ${mode === 'excel' ? 'bg-white text-green-700 border-b-2 border-green-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
            >
              <Table className="h-4 w-4" /> Excel
            </button>
            <button 
              onClick={() => setMode('google-sheets')}
              className={`flex-1 py-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-all ${mode === 'google-sheets' ? 'bg-white text-green-700 border-b-2 border-green-600 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
            >
              <Database className="h-4 w-4" /> Google Sheets
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex justify-between">
                <span>Describe your problem</span>
                <span className="text-xs font-normal text-slate-400">English / 中文 supported</span>
              </label>
              <textarea
                rows={3}
                className="w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-800 p-4 border bg-slate-50 resize-none text-base transition-all focus:bg-white"
                placeholder='e.g., "If column A is greater than 100, show High, otherwise Low" 或者 "如果 A 列的日期是周末，计算 B 列的总和"'
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
            <h3 className="font-bold text-slate-900 mb-2">Multi-Language</h3>
            <p className="text-sm">Describe in English, Chinese, or Spanish. AI understands it all.</p>
          </div>
        </div>
      </main>
    </div>
  );
}