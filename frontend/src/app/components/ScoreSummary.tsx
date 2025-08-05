const ACCENT = "#a3acde";

export default function ScoreSummary({ total, max, summary }: { total: number, max: number, summary: string }) {
  function scoreColor(score: number, max: number) {
    const pct = score / max;
    if (pct >= 0.75) return "bg-green-100 text-green-700 border-green-400";
    if (pct >= 0.5) return "bg-yellow-100 text-yellow-700 border-yellow-400";
    return "bg-red-100 text-red-700 border-red-400";
  }
  return (
    <div className="flex flex-col md:items-center gap-4 mb-4 w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center gap-4">
        <div className={`flex flex-col items-center justify-center border-4 ${scoreColor(total, max)} rounded-full h-20 w-20 md:h-24 md:w-24 shadow-xl`}>
          <span className="text-3xl md:text-4xl font-bold">{total}</span>
          <span className="text-xs font-semibold uppercase tracking-widest">Score</span>
        </div>
        <div>
          <span className="text-gray-500 text-xs">of {max}</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="rounded-lg bg-[#f4f4fa] border p-3 text-gray-800 text-sm md:text-base font-medium leading-snug" style={{ borderColor: ACCENT }}>
          {summary}
        </div>
      </div>
    </div>
  );
}
