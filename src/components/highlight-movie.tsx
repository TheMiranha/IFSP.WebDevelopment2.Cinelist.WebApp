import { useNavigate } from "react-router-dom";
import { Play, Loader2 } from "lucide-react";
import { Button } from "./button";
import type { Movie } from "../api/cinelist";

interface HighLightMovieProps {
  movie: Movie | undefined;
}

export function HighLightMovie({ movie }: HighLightMovieProps) {
  const navigate = useNavigate();

  if (!movie) {
    return (
      <div className="relative w-full h-[32rem] bg-zinc-900 animate-pulse flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-zinc-700 animate-spin" />
      </div>
    );
  }

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="relative w-full h-[32rem] overflow-hidden bg-zinc-950">
      <div className="absolute inset-0">
        <img
          src={
            movie.imageUrl
              ? `${movie.imageUrl}&w=2525&auto=format&fit=crop`
              : undefined
          }
          alt="Background Blur"
          className="w-full h-full object-cover blur-3xl opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/30 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center gap-12">
        <div className="flex-1 flex flex-col justify-center items-start pt-12 md:pt-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            {movie.title}
          </h1>

          <p className="text-zinc-300 text-lg mb-8 max-w-xl line-clamp-3 md:line-clamp-4">
            {movie.description}
          </p>

          <Button
            variant="primary"
            className="flex items-center gap-2 px-8 py-6 text-lg"
            onClick={handleClick}
          >
            <Play className="w-5 h-5 fill-current" />
            Ver Detalhes
          </Button>
        </div>

        <div className="hidden md:block flex-shrink-0 relative group perspective-1000">
          <img
            src={movie.imageUrl}
            alt={`Poster ${movie.title}`}
            className="w-[300px] h-[450px] object-cover rounded-xl shadow-2xl shadow-black/80 ring-1 ring-white/10 transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
