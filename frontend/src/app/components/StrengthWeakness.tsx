const GOOD = "#a8e6cf";
const BAD = "#ffb3b3";

export default function StrengthWeakness({ strengths, weaknesses }: { strengths: string[], weaknesses: string[] }) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto mb-4">
      <div className="flex-1">
        <h4 className="font-bold text-green-700 mb-2">Strengths</h4>
        <div className="flex flex-wrap gap-2">
          {strengths.map((str, i) => (
            <span key={i} className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: GOOD, color: "#15803d" }}>{str}</span>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-red-700 mb-2">Weaknesses</h4>
        <div className="flex flex-wrap gap-2">
          {weaknesses.map((w, i) => (
            <span key={i} className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: BAD, color: "#b91c1c" }}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
