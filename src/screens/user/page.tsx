import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import { MovieCard } from "../../components/movie-card";
import { ScrollArea } from "../../components/scroll-area";
import { UserReviewItem } from "../../components/user-review-item";
import { useUserStore } from "../../stores/user-store";
import { me, type Movie, type Rating } from "../../api/cinelist";
import { User } from "lucide-react";

function UserScreen() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("favorites");
  const currentUser = useUserStore((state) => state.user);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [toWatch, setToWatch] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(false);

  // Usa os dados do usuário logado se o ID corresponder
  const user = currentUser && currentUser.id === id ? currentUser : null;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.id === id) {
        setLoading(true);
        try {
          const response = await me();
          if (response.success && response.data) {
            setFavorites(response.data.favorites || []);
            setToWatch(response.data.toWatch || []);
            setWatched(response.data.watched || []);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, id]);

  const renderContent = () => {
    if (activeTab === "reviews") {
      // Para reviews, precisamos extrair os dados dos ratings watched
      const reviews = watched.map((rating, index) => ({
        id: index,
        movieTitle: rating.movie?.title || "Filme",
        movieCover: rating.movie?.imageUrl || null,
        rating: rating.rate,
        text: rating.description,
        date: rating.createdAt,
      }));

      return (
        <div className="space-y-4 max-w-4xl mx-auto">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <UserReviewItem key={review.id} review={review} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm mt-4 text-center">
              Nenhuma resenha encontrada.
            </p>
          )}
        </div>
      );
    }

    let currentMovies: Movie[] = [];
    switch (activeTab) {
      case "watchlist":
        currentMovies = toWatch;
        break;
      case "favorites":
        currentMovies = favorites;
        break;
      default:
        currentMovies = [];
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <p className="text-zinc-400">Carregando...</p>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-6 justify-center">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {currentMovies.length === 0 && (
          <p className="text-zinc-500 text-sm mt-4">
            Nenhum filme nesta lista.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Header />

      <main className="pt-16">
        <ScrollArea>
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 p-1 flex items-center justify-center">
                {user?.image_url ? (
                  <img
                    src={user.image_url}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-zinc-400" />
                )}
              </div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white">
                  {user?.name || "Usuário"}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("watchlist")}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "watchlist"
                    ? "border-blue-600 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                Watchlist
              </button>

              <button
                onClick={() => setActiveTab("favorites")}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "favorites"
                    ? "border-blue-600 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                Favoritos
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "reviews"
                    ? "border-blue-600 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                Resenhas
              </button>
            </div>

            <div className="min-h-[300px] animate-in fade-in duration-500">
              {renderContent()}
            </div>
          </div>
          <div className="h-20" />
        </ScrollArea>
      </main>
    </div>
  );
}

export default UserScreen;
