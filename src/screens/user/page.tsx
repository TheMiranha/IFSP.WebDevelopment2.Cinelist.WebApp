import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";
import { MovieCard } from "../../components/movie-card";
import { ScrollArea } from "../../components/scroll-area";
import { UserReviewItem } from "../../components/user-review-item";
import { useUserStore } from "../../stores/user-store";
import { User } from "lucide-react";

function UserScreen() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("favorites");
  const currentUser = useUserStore((state) => state.user);

  // Usa os dados do usuário logado se o ID corresponder
  const user = currentUser && currentUser.id === id ? currentUser : null;

  const watchedMovies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DXDAoLu.jpg",
    },
    {
      id: 3,
      title: "The Batman",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 4,
      title: "Everything Everywhere All At Once",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/rKvCys0f9XNSn0rGf8c14Rk8A0.jpg",
    },
  ];

  const watchlistMovies = [
    {
      id: 5,
      title: "Dune: Part Two",
      year: "2024",
      cover: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    },
    {
      id: 6,
      title: "Oppenheimer",
      year: "2023",
      cover: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    },
    {
      id: 7,
      title: "Spider-Man: Across the Spider-Verse",
      year: "2023",
      cover: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    },
  ];

  const favoriteMovies = [
    {
      id: 8,
      title: "Interstellar",
      year: "2014",
      cover: "https://image.tmdb.org/t/p/w500/gEU2QniL6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: 9,
      title: "The Dark Knight",
      year: "2008",
      cover: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 10,
      title: "Pulp Fiction",
      year: "1994",
      cover: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    },
    {
      id: 11,
      title: "Inception",
      year: "2010",
      cover: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuy.jpg",
    },
    {
      id: 12,
      title: "Parasite",
      year: "2019",
      cover: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    },
    {
      id: 13,
      title: "The Matrix",
      year: "1999",
      cover: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
      id: 14,
      title: "Fight Club",
      year: "1999",
      cover: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7Qf4n6a87u0F.jpg",
    },
    {
      id: 15,
      title: "Goodfellas",
      year: "1990",
      cover: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    },
    {
      id: 16,
      title: "The Shawshank Redemption",
      year: "1994",
      cover: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    {
      id: 17,
      title: "Forrest Gump",
      year: "1994",
      cover: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    },
    {
      id: 18,
      title: "Spirited Away",
      year: "2001",
      cover: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    },
    {
      id: 19,
      title: "Gladiator",
      year: "2000",
      cover: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    },
  ];

  const userReviews = [
    {
      id: 1,
      movieTitle: "Duna: Parte 2",
      movieCover:
        "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      rating: 5,
      text: "Simplesmente espetacular. A fotografia e o design de som são de outro mundo. Villeneuve se superou.",
      date: "Há 2 dias",
    },
    {
      id: 2,
      movieTitle: "Barbie",
      movieCover:
        "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
      rating: 4,
      text: "Muito mais profundo do que eu esperava. Ótima crítica social com humor.",
      date: "Há 1 mês",
    },
  ];

  const renderContent = () => {
    if (activeTab === "reviews") {
      return (
        <div className="space-y-4 max-w-4xl mx-auto">
          {userReviews.map((review) => (
            <UserReviewItem key={review.id} review={review} />
          ))}
        </div>
      );
    }

    type Movie = {
      id: number;
      title: string;
      year: string;
      cover: string;
    };

    let currentMovies: Movie[] = [];
    switch (activeTab) {
      case "watched":
        currentMovies = watchedMovies;
        break;
      case "watchlist":
        currentMovies = watchlistMovies;
        break;
      case "favorites":
        currentMovies = favoriteMovies;
        break;
      default:
        currentMovies = [];
    }

    return (
      <div className="flex flex-wrap gap-6 justify-center">
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            cover={movie.cover}
          />
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
                onClick={() => setActiveTab("watched")}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "watched"
                    ? "border-blue-600 text-blue-500"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                Assistidos
              </button>

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
