'use client';

import React, { useState } from "react";
import ModeSwitcher from "../components/generator/ModeSwitcher";
import GeneratorForm from "../components/generator/GeneratorForm";
import ResultDisplay from "../components/generator/ResultDisplay";
import FeatureSection from "../components/generator/FeatureSection";
import FAQSection from "../components/generator/FAQSection";
import Footer from "../components/generator/Footer";

export default function Home() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"excel" | "google-sheets">("excel");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setResult("");
    setCopied(false);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, mode }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        setResult(data.error || "Error generating formula");
      } else {
        setResult(data.formula);
        document
          .getElementById("result-section")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch {
      setResult("Error: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDescription("");
    setResult("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold italic text-lg leading-none pl-0.5">
                fx
              </span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Excel Formula <span className="text-green-600">Generator</span>
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Free <span className="text-green-600">AI Excel Formula Generator</span>{" "}
            & Google Sheets Helper
          </h1>
          <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto mb-6">
            Turn text into formulas instantly. Stop struggling with syntax—just
            ask our AI in your native language.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
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

        <FeatureSection />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
