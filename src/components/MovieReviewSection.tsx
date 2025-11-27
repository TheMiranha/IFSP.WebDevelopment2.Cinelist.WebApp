import { Star, User } from "lucide-react";
import { Button } from "./Button";

export function MovieReviewSection() {
  const reviews = [
    {
      id: 1,
      user: "Ana Clara",
      rating: 5,
      text: "Uma obra-prima visual e sonora. A adaptação de Villeneuve é fiel ao material original.",
      date: "Há 2 dias",
    },
    {
      id: 2,
      user: "Bruno Costa",
      rating: 4,
      text: "O filme é um pouco lento no início, mas a construção do mundo é fantástica.",
      date: "Há 1 semana",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-6">
        Resenhas da Comunidade
      </h2>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-10 focus-within:ring-2 focus-within:ring-blue-600/50 transition-all">
        <textarea
          placeholder="Escreva sua resenha sobre o filme..."
          className="w-full bg-transparent text-white placeholder:text-zinc-500 resize-none h-24 focus:outline-none text-sm"
        />
        <div className="flex justify-end mt-2">
          <Button variant="primary" className="text-xs px-6">
            Publicar
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  <User className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {review.user}
                  </h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-zinc-400">
                      {review.rating}.0/5.0
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-zinc-500">{review.date}</span>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
