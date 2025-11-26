import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { Button } from "./Button";

export function MovieCarousel({ title, movies }) {
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount =
        direction === "left"
          ? current.scrollLeft - 480
          : current.scrollLeft + 480;

      current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-4 px-6 md:px-0 my-4">
      <h2 className="text-2xl font-bold text-white pl-1 ml-6 md:ml-0">
        {title}
      </h2>

      <div className="relative group">
        {/* Botão da esquerda */}
        <Button
          variant="circular"
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-2/5 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Carrossel */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto py-8 px-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              cover={movie.cover}
            />
          ))}
        </div>

        {/* Botão da direita */}
        <Button
          variant="circular"
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-2/5 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </section>
  );
}
