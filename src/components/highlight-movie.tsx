import { Play, Plus, Loader2 } from "lucide-react"; // Importe o Loader se quiser, ou use div simples
import { Button } from "./button";
import type { Movie } from "../api/cinelist";

interface HighLightMovieProps {
  movie: Movie | undefined;
}

export function HighLightMovie({ movie }: HighLightMovieProps) {
  if (!movie) {
    return (
      <div className="relative w-full h-[32rem] bg-zinc-900 animate-pulse flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-zinc-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[32rem] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={
            movie.imageUrl
              ? `${movie.imageUrl}&w=2525&auto=format&fit=crop`
              : undefined
          }
          alt={`Destaque: ${movie.title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 pb-12 flex flex-col justify-end items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {movie.title}
        </h1>

        <p className="text-zinc-300 text-lg mb-8 max-w-2xl line-clamp-3">
          {movie.description}
        </p>

        <div className="flex gap-4">
          <Button
            variant="primary"
            className="flex items-center gap-2 px-6 py-3"
          >
            <Play className="w-4 h-4 fill-current" />
            Assistir Trailer
          </Button>

          <Button
            variant="secondary"
            className="flex items-center gap-2 px-6 py-3"
          >
            <Plus className="w-4 h-4" />
            Adicionar à Lista
          </Button>
        </div>
      </div>
    </div>
  );
}
