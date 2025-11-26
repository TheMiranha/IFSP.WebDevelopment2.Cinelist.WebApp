import { useState } from "react";
import { Clapperboard } from "lucide-react";

export function MovieCard({ title, year, cover }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-[160px] flex-shrink-0 cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 origin-center relative">
      <div className="rounded-lg mb-3 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/50">
        {!imageError && cover ? (
          <img
            src={cover}
            alt={`Capa do filme ${title}`}
            className="w-full h-[240px] object-cover rounded-lg bg-zinc-800"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-[240px] bg-zinc-800 rounded-lg flex flex-col items-center justify-center gap-2 text-zinc-500 border border-zinc-700/50 p-2">
            <Clapperboard className="w-10 h-10 opacity-40 flex-shrink-0" />

            <span className="text-xs font-medium uppercase tracking-wider opacity-60 text-center break-words w-full">
              {title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-white font-medium text-base truncate block transition-colors">
          {title}
        </span>
        <span className="text-zinc-500 text-sm">{year}</span>
      </div>
    </div>
  );
}
