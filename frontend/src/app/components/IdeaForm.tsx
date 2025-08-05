import { useState } from "react";
const ACCENT = "#a3acde";

export default function IdeaForm({ onSubmit, loading }: { onSubmit: (idea: string) => void, loading: boolean }) {
  const [idea, setIdea] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!loading && idea.trim()) onSubmit(idea);
      }}
      className="flex flex-col gap-4 max-w-2xl mx-auto w-full"
    >
      <p className="text-gray-600 text-center text-base md:text-lg font-medium">
        Paste your startup or product idea below.<br />
        You’ll get an instant, evidence-driven evaluation.
      </p>
      <textarea
        style={{ background: "#f4f4fa", borderColor: ACCENT }}
        className="resize-none h-28 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#a3acde] placeholder-gray-400 transition"
        placeholder="Describe your idea here…"
        value={idea}
        onChange={e => setIdea(e.target.value)}
        required
        maxLength={600}
      />
      <button
        type="submit"
        disabled={loading || !idea.trim()}
        style={{
          background: ACCENT,
          color: "#fff",
          fontWeight: 700,
        }}
        className="py-3 px-5 rounded-lg shadow transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed self-center flex items-center gap-2"
      >
        {loading && (
          <span className="inline-block animate-spin rounded-full border-2 border-t-transparent border-white h-5 w-5 mr-2"></span>
        )}
        {loading ? "Analyzing..." : "Rate My Idea"}
      </button>
      {loading && (
        <div className="text-xs text-center text-gray-500 mt-[-8px]">
          <span>
            First request may take up to 45 seconds to boot the server. Subsequent requests are much faster.
          </span>
        </div>
      )}
    </form>
  );
}
