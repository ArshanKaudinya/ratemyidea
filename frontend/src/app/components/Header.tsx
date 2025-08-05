import Image from "next/image";
const ACCENT = "#a3acde";

export default function Header({ onNewIdea }: { onNewIdea?: () => void }) {
  return (
    <header className="w-full px-10 md:px-14 pt-5 pb-2">
      <div className="flex items-center justify-between">
        <span
          style={{ color: ACCENT }}
          className="text-xl sm:text-3xl font-extrabold tracking-tight"
        >
          Rate My Idea
        </span>
        <div className="flex items-center gap-3">
          <a
            href="https://ko-fi.com/YOURKOFIUSERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center cursor-pointer font-bold text-white"
            style={{ background: "#fff" }}
          >
            <Image
              src="https://img.icons8.com/?size=100&id=CzKT8G96YYua&format=png&color=000000"
              alt="Ko-fi"
              width={34}
              height={34}
              className="mr-1"
            />
          </a>
          <button
            onClick={onNewIdea}
            className="px-4 cursor-pointer text-sm sm:text-lg py-1.5 ml-2 rounded-lg font-bold"
            style={{ background: ACCENT, color: "#fff" }}
          >
            New Idea
          </button>
        </div>
      </div>
    </header>
  );
}
