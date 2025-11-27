import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../components/button";
import { MoviePanel } from "../../components/movie-panel";
import { MovieReviewSection } from "../../components/movie-review-section";
import { ScrollArea } from "../../components/scroll-area";

function MovieScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const movieData = location.state?.movie || {
    title: "Filme Exemplo",
    year: "2024",
    cover: "https://image.tmdb.org/t/p/w1280/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    description: "Sem descrição disponível.",
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Header />

      <main className="pt-16">
        <ScrollArea>
          <div className="absolute top-4 left-4 z-50 md:hidden">
            <Button variant="circular" onClick={() => navigate(-1)}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          <MoviePanel movie={movieData} />

          <MovieReviewSection />

          <div className="h-20" />
        </ScrollArea>
      </main>
    </div>
  );
}

export default MovieScreen;
