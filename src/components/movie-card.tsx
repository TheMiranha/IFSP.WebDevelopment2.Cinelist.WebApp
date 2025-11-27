import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clapperboard } from "lucide-react";
import type { Movie } from "../api/cinelist";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [movie?.imageUrl]);

  const handleDetails = () => {
    if (movie?.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  if (!movie) {
    return null;
  }

  const hasValidImage = movie.imageUrl && movie.imageUrl.trim() !== "";

  return (
    <div
      onClick={handleDetails}
      className="w-[160px] flex-shrink-0 cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 origin-center relative"
    >
      <div className="rounded-lg mb-3 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/50">
        {hasValidImage && !imageError ? (
          <img
            src={movie.imageUrl ?? undefined}
            alt={`Capa do filme ${movie.title}`}
            className="w-full h-[240px] object-cover rounded-lg bg-zinc-800"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-[240px] bg-zinc-800 rounded-lg flex flex-col items-center justify-center gap-2 text-zinc-500 border border-zinc-700/50 p-2">
            <Clapperboard className="w-10 h-10 opacity-40 flex-shrink-0" />
            <span className="text-xs font-medium uppercase tracking-wider opacity-60 text-center break-words w-full">
              {movie.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-white font-medium text-base truncate block transition-colors">
          {movie.title}
        </span>
        <span className="text-zinc-500 text-sm">
          {/* Dica Extra: Garanta que é um objeto Date antes de chamar o método */}
          {movie.releasedAt ? new Date(movie.releasedAt).getFullYear() : "----"}
        </span>
      </div>
    </div>
  );
}
