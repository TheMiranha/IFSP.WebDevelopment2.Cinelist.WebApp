import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Calendar,
  Heart,
  Eye,
  ListPlus,
  Clapperboard,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./Button";

export function MoviePanel({ movie }) {
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  const genres = ["Ficção Científica", "Aventura", "Drama"];

  return (
    <div className="relative w-full">
      <div className="absolute top-3 left-2 z-50">
        <Button variant="circular" onClick={() => navigate("/")}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute inset-0 h-[500px] overflow-hidden">
        {!imageError && movie.cover ? (
          <img
            src={movie.cover}
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
          {!imageError && movie.cover ? (
            <img
              src={movie.cover}
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
              <Calendar className="w-4 h-4" /> {movie.year}
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
              Em um futuro distante, Paul Atreides, um jovem brilhante e
              talentoso nascido com um grande destino para além de sua
              compreensão, deve viajar para o planeta mais perigoso do universo
              para garantir o futuro de sua família e de seu povo.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-black/50 font-bold text-xl text-yellow-500">
                8.2
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Média da Comunidade</span>
                <span className="text-xs text-zinc-500">
                  Baseado em 12.345 votos
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
                variant="secondary"
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-zinc-600"
              >
                <Eye className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-zinc-600"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-sm font-bold block mb-2">Sua Avaliação</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-6 h-6 text-zinc-600 hover:text-yellow-500 cursor-pointer transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
