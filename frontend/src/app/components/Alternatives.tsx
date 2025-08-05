const ACCENT = "#a3acde";

export default function Alternatives({ alternate_ideas }: { alternate_ideas: string[] }) {
  return (
    <section className="w-full max-w-2xl mx-auto">
      <h4 className="font-bold" style={{ color: ACCENT }}>Alternate Ideas</h4>
      <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700 text-sm">
        {alternate_ideas.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </section>
  );
}
