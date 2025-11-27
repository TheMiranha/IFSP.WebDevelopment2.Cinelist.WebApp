import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  Heart,
  ListPlus,
  Clapperboard,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./button";
import { addFavorite } from "../api/cinelist";
import { useUserStore } from "../stores/user-store";
import type { Movie } from "../api/cinelist";

interface MoviePanelProps {
  movie: Movie;
  onFavoriteChange?: () => void;
}

export function MoviePanel({ movie, onFavoriteChange }: MoviePanelProps) {
  const [imageError, setImageError] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const favorites = useUserStore((state) => state.favorites);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  
  // Verifica se o filme está nos favoritos (comparação de strings)
  const isFavorite = favorites.some((fav) => String(fav.id) === String(movie.id));

  // Garante que os favoritos sejam carregados quando o componente montar
  useEffect(() => {
    if (user && favorites.length === 0) {
      fetchUser();
    }
  }, [user, favorites.length, fetchUser]);

  const navigate = useNavigate();

  const genres = ["Ficção Científica", "Aventura", "Drama"];
  const year = movie.releasedAt ? new Date(movie.releasedAt).getFullYear() : "----";

  const handleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      await addFavorite({ movieId: movie.id });
      // Recarrega os dados do usuário para atualizar a lista de favoritos
      await fetchUser();
      // Chama callback se fornecido
      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (error) {
      console.error("Erro ao favoritar filme:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute top-3 left-2 z-50">
        <Button variant="circular" onClick={() => navigate("/")}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute inset-0 h-[500px] overflow-hidden">
        {!imageError && movie.imageUrl ? (
          <img
            src={movie.imageUrl}
            alt="Background"
            className="w-full h-full object-cover opacity-30 blur-xl scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-12 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          {!imageError && movie.imageUrl ? (
            <img
              src={movie.imageUrl}
              alt={`Poster ${movie.title}`}
              className="w-64 h-96 object-cover rounded-xl shadow-2xl shadow-black/50 border border-zinc-800"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-64 h-96 bg-zinc-800 rounded-xl shadow-2xl shadow-black/50 border border-zinc-700/50 flex flex-col items-center justify-center gap-4 text-zinc-500 p-4">
              <Clapperboard className="w-16 h-16 opacity-40 flex-shrink-0" />
              <span className="text-sm font-medium uppercase tracking-wider opacity-60 text-center break-words w-full">
                {movie.title}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-end text-white flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>

          <div className="flex items-center gap-4 text-zinc-400 text-sm mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {year}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> 155 min
            </span>
          </div>

          <div className="flex gap-2 mb-6">
            {genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-medium border border-blue-600/30"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Sinopse</h3>
            <p className="text-zinc-300 leading-relaxed max-w-3xl">
              {movie.description || "Sem descrição disponível."}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-black/50 font-bold text-xl text-yellow-500">
                {movie.tmdbRate ? movie.tmdbRate.toFixed(1) : "N/A"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Média da Comunidade</span>
                <span className="text-xs text-zinc-500">
                  {movie.tmdbRate ? "Avaliação TMDB" : "Sem avaliação"}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
              >
                <ListPlus className="w-5 h-5" />
              </Button>
              <Button
                variant={isFavorite ? "primary" : "secondary"}
                className={`rounded-full w-12 h-12 p-0 flex items-center justify-center ${
                  isFavorite ? "" : "border-zinc-600"
                }`}
                onClick={handleFavorite}
                disabled={favoriteLoading}
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} 
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
