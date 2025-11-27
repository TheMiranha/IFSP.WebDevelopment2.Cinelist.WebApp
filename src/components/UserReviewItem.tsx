import { Star } from "lucide-react";

export function UserReviewItem({ review }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 flex gap-4 hover:border-zinc-700 transition-colors">
      <div className="flex-shrink-0 w-16 h-24">
        <img
          src={review.movieCover}
          alt={review.movieTitle}
          className="w-full h-full object-cover rounded-md border border-zinc-700"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-bold text-white text-sm">
              {review.movieTitle}
            </h4>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs text-zinc-400">
                {review.rating}.0/5.0
              </span>
            </div>
          </div>
          <span className="text-xs text-zinc-500">{review.date}</span>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">
          {review.text}
        </p>
      </div>
    </div>
  );
}
