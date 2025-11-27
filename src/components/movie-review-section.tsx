import { useState, useEffect, useMemo } from "react";
import { Star, User } from "lucide-react";
import { Button } from "./button";
import { createRating, type Rating } from "../api/cinelist";
import { useUserStore } from "../stores/user-store";

interface MovieReviewSectionProps {
  movieId?: string;
  ratings?: Rating[];
  onRatingSaved?: () => void;
}

export function MovieReviewSection({ movieId, ratings = [], onRatingSaved }: MovieReviewSectionProps) {
  const user = useUserStore((state) => state.user);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Encontra o rating do usuário logado
  const userRating = useMemo(() => {
    if (!user) return null;
    return ratings.find((r) => r.user.id === user.id) || null;
  }, [user?.id, ratings]);

  // Verifica se há rating do usuário logado e preenche os campos
  useEffect(() => {
    if (!user) {
      setRating(0);
      setDescription("");
      setIsEditing(false);
      return;
    }

    if (userRating) {
      // Preenche os campos com o rating do usuário
      setRating(userRating.rate);
      setDescription(userRating.description);
      setIsEditing(true);
    }
    // Não limpa se não encontrar, para não perder o que o usuário está digitando
  }, [user?.id, userRating]);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInDays > 0) {
      return diffInDays === 1 ? "Há 1 dia" : `Há ${diffInDays} dias`;
    } else if (diffInHours > 0) {
      return diffInHours === 1 ? "Há 1 hora" : `Há ${diffInHours} horas`;
    } else if (diffInMinutes > 0) {
      return diffInMinutes === 1 ? "Há 1 minuto" : `Há ${diffInMinutes} minutos`;
    } else {
      return "Agora";
    }
  };

  const handleSubmit = async () => {
    if (!movieId || !rating || !description.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await createRating({
        movieId,
        rate: rating,
        description: description.trim(),
      });
      
      if (response.success) {
        // Recarrega os dados do filme para mostrar a avaliação atualizada
        if (onRatingSaved) {
          onRatingSaved();
        }
      }
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = rating > 0 && description.trim().length > 0 && movieId;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-6">
        Resenhas da Comunidade
      </h2>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-10 focus-within:ring-2 focus-within:ring-blue-600/50 transition-all">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escreva sua resenha sobre o filme..."
          className="w-full bg-transparent text-white placeholder:text-zinc-500 resize-none h-24 focus:outline-none text-sm mb-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Sua avaliação:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-colors"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-500 fill-current"
                        : "text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="text-sm text-zinc-400 ml-1">
                {rating}.0/5.0
              </span>
            )}
          </div>
          <Button
            variant="primary"
            className="text-xs px-6"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
          >
            {loading 
              ? (isEditing ? "Salvando..." : "Publicando...") 
              : (isEditing ? "Salvar" : "Publicar")
            }
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {ratings.length > 0 ? (
          ratings.map((ratingItem, index) => (
            <div
              key={`${ratingItem.user.id}-${index}`}
              className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {ratingItem.user.imageUrl ? (
                    <img
                      src={ratingItem.user.imageUrl}
                      alt={ratingItem.user.name}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <User className="w-5 h-5 text-zinc-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {ratingItem.user.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-zinc-400">
                        {ratingItem.rate}.0/5.0
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-zinc-500">
                  {formatDate(ratingItem.createdAt)}
                </span>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {ratingItem.description}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm">
              Ainda não há resenhas para este filme. Seja o primeiro a avaliar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
