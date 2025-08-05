const ACCENT = "#a3acde";
const METRIC_BAR = "#a3acde";

export default function Metrics({ metrics }: { metrics: { name: string, score: number }[] }) {
  return (
    <section className="w-full mx-auto mt-4 mb-2">
      <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: ACCENT }}>Metrics</h3>
      <div className="flex flex-col gap-2 md:gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="flex items-center gap-2 md:gap-3"
          >
            {/* Label */}
            <div className="w-24 sm:w-40 text-gray-700 font-semibold text-xs sm:text-sm truncate">
              {metric.name}
            </div>
            {/* Bar */}
            <div className="flex-1 h-3 sm:h-4 bg-[#eceffe] rounded">
              <div
                className="h-3 sm:h-4 rounded transition-all"
                style={{
                  width: `${(metric.score / 10) * 100}%`,
                  background: METRIC_BAR,
                }}
              ></div>
            </div>
            {/* Score */}
            <div className="w-8 sm:w-12 md:w-16 text-center text-gray-700 font-bold text-base sm:text-lg">
              {metric.score}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
