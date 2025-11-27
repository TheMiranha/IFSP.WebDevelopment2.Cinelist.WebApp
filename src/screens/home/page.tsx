import { useState, useEffect } from "react"; // 1. Importe useEffect
import { getTopMovies, type Movie } from "../../api/cinelist";
import Header from "../../components/header";
import { HighLightMovie } from "../../components/highlight-movie";
import { MovieCarousel } from "../../components/movie-caroussel";
import { ScrollArea } from "../../components/scroll-area";
import { Loader2 } from "lucide-react";

type MoviesData = {
  classics: Movie[];
  highlights: Movie[];
  newReleases: Movie[];
};

function HomeScreen() {
  const [movies, setMovies] = useState<MoviesData>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTopMovies();
        if (response.success && response.data) {
          setMovies(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Header />

      <main className="pt-16">
        <ScrollArea>
          <HighLightMovie movie={movies?.highlights[0]} />

          <div className="max-w-7xl mx-auto space-y-8 mt-8 overflow-hidden pb-10">
            {movies ? (
              <>
                <MovieCarousel
                  category="Lançamentos"
                  movies={movies.newReleases}
                />

                <MovieCarousel
                  category="Destaques"
                  movies={movies.highlights}
                />

                <MovieCarousel category="Clássicos" movies={movies.classics} />
              </>
            ) : (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

export default HomeScreen;
