import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "../../components/button";
import { MoviePanel } from "../../components/movie-panel";
import { MovieReviewSection } from "../../components/movie-review-section";
import { ScrollArea } from "../../components/scroll-area";
import { getMovie, type GetMovieResponse } from "../../api/cinelist";

function MovieScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<GetMovieResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovie = async () => {
    if (!id) {
      setError("ID do filme não encontrado");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getMovie(id);
      if (response.success && response.data) {
        setMovieData(response.data);
      } else {
        setError("Filme não encontrado");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar filme");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">
        <Header />
        <main className="pt-16">
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !movieData) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white font-sans">
        <Header />
        <main className="pt-16">
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-red-400 text-lg mb-4">{error || "Filme não encontrado"}</p>
            <Button variant="primary" onClick={() => navigate("/")}>
              Voltar para Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

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

          <MoviePanel movie={movieData.movie} />

          <MovieReviewSection 
            movieId={id} 
            ratings={movieData.ratings} 
            onRatingSaved={fetchMovie}
          />

          <div className="h-20" />
        </ScrollArea>
      </main>
    </div>
  );
}

export default MovieScreen;
