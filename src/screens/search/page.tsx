import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import { MovieCard } from "../../components/movie-card";
import { ScrollArea } from "../../components/scroll-area";
import { searchMovie } from "../../api/cinelist";
import { Loader2 } from "lucide-react";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await searchMovie(query);
        if (response.success && response.data) {
          // Mapear os dados da API para o formato esperado pelo MovieCard
          const mappedMovies = response.data.map((movie) => ({
            id: movie.id,
            title: movie.title,
            year: movie.releasedAt ? new Date(movie.releasedAt).getFullYear().toString() : "",
            cover: movie.imageUrl || null,
          }));
          setMovies(mappedMovies);
        } else {
          setMovies([]);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao buscar filmes.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Header />

      <main className="pt-16">
        <ScrollArea>
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-white mb-8">
              {query ? `Resultados para "${query}"` : "Buscar filmes"}
            </h1>

            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-800 rounded-md text-red-300 text-sm mb-6">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {movies.length > 0 ? (
                  <div className="flex flex-wrap gap-6 justify-center">
                    {movies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        year={movie.year}
                        cover={movie.cover}
                      />
                    ))}
                  </div>
                ) : query ? (
                  <div className="text-center py-20">
                    <p className="text-zinc-400 text-lg">
                      Nenhum filme encontrado para "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-zinc-400 text-lg">
                      Digite algo para buscar filmes
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="h-20" />
        </ScrollArea>
      </main>
    </div>
  );
}

export default SearchPage;

