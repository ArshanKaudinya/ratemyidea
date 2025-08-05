const ACCENT = "#a3acde";

export default function Suggestions({ suggestions }: { suggestions: string[] }) {
  return (
    <section className="w-full align-start max-w-2xl mx-auto">
      <h4 className="font-bold" style={{ color: ACCENT }}>Suggestions</h4>
      <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700 text-sm">
        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </section>
  );
}
