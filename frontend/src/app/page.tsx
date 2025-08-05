/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Header from "./components/Header";
import IdeaForm from "./components/IdeaForm";
import ScoreSummary from "./components/ScoreSummary";
import Metrics from "./components/Metrics";
import StrengthsWeaknesses from "./components/StrengthWeakness";
import Suggestions from "./components/Suggestions";
import Alternates from "./components/Alternatives";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-5 h-full flex flex-col justify-center">
      {children}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSubmit(idea: string) {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Failed to analyze. Please try again.");
    }
    setLoading(false);
  }

  const handleNewIdea = () => {
    setResult(null);
    setError("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNewIdea={handleNewIdea} />
      <main className="flex-grow flex flex-col items-center px-8 pt-2 w-full">
  <div className="w-full mx-auto grid 
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-[80vh]">
    {/* Only show IdeaForm if no result */}
    {!result && (
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <Card>
          <IdeaForm onSubmit={handleSubmit} loading={loading} />
          {error && <div className="mt-2 text-center text-red-500">{error}</div>}
        </Card>
      </div>
    )}
    {result && (
      <>
        {/* First row */}
        <div className="lg:col-span-2 col-span-1">
          <Card>
            <ScoreSummary total={result.total_score} max={result.max_score} summary={result.summary} />
          </Card>
        </div>
        <div className="lg:col-span-1 col-span-1">
          <Card>
            <Metrics metrics={result.metrics} />
          </Card>
        </div>
        {/* Second row */}
        <Card>
          <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />
        </Card>
        <Card>
          <Suggestions suggestions={result.suggestions} />
        </Card>
        <div className="sm:col-span-2 lg:col-span-1">
          <Card>
            <Alternates alternate_ideas={result.alternate_ideas} />
          </Card>
        </div>
      </>
    )}
  </div>
</main>


    </div>
  );
}
