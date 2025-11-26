import Header from "../components/Header";
import { HighLightMovie } from "../components/HighlightMovie";
import { MovieCarousel } from "../components/MovieCaroussel";

function HomeScreen() {
  const popularMovies = [
    {
      id: 1,
      title: "Inception",
      year: "2010",
      cover: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuy.jpg",
    },
    {
      id: 2,
      title: "The Dark Knight",
      year: "2008",
      cover: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 3,
      title: "Interstellar",
      year: "2014",
      cover: "https://image.tmdb.org/t/p/w500/gEU2QniL6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: 4,
      title: "Parasite",
      year: "2019",
      cover: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    },
    {
      id: 5,
      title: "Joker",
      year: "2019",
      cover: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    },
    {
      id: 6,
      title: "Avengers: Endgame",
      year: "2019",
      cover: "https://image.tmdb.org/t/p/w500/br6DYddAmV64wYl75OQG9qXpH52.jpg",
    },
    {
      id: 7,
      title: "Oppenheimer",
      year: "2023",
      cover: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    },
    {
      id: 8,
      title: "Barbie",
      year: "2023",
      cover: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    },
    {
      id: 9,
      title: "Dune: Part Two",
      year: "2024",
      cover: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    },
    {
      id: 10,
      title: "Spider-Man: Across the Spider-Verse",
      year: "2023",
      cover: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    },
    {
      id: 11,
      title: "The Batman",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: 12,
      title: "Top Gun: Maverick",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DXDAoLu.jpg",
    },
    {
      id: 13,
      title: "Avatar: The Way of Water",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    },
    {
      id: 14,
      title: "Everything Everywhere All At Once",
      year: "2022",
      cover: "https://image.tmdb.org/t/p/w500/rKvCys0f9XNSn0rGf8c14Rk8A0.jpg",
    },
    {
      id: 15,
      title: "Guardians of the Galaxy Vol. 3",
      year: "2023",
      cover: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    },
  ];

  const classicMovies = [
    {
      id: 101,
      title: "Pulp Fiction",
      year: "1994",
      cover: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    },
    {
      id: 102,
      title: "The Godfather",
      year: "1972",
      cover: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    },
    {
      id: 103,
      title: "The Matrix",
      year: "1999",
      cover: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
      id: 104,
      title: "Fight Club",
      year: "1999",
      cover: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7Qf4n6a87u0F.jpg",
    },
    {
      id: 105,
      title: "Goodfellas",
      year: "1990",
      cover: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    },
    {
      id: 106,
      title: "The Shawshank Redemption",
      year: "1994",
      cover: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    {
      id: 107,
      title: "Forrest Gump",
      year: "1994",
      cover: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    },
    {
      id: 108,
      title: "Star Wars: A New Hope",
      year: "1977",
      cover: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    },
    {
      id: 109,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: "2001",
      cover: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    },
    {
      id: 110,
      title: "Back to the Future",
      year: "1985",
      cover: "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAQL9jeFFFW.jpg",
    },
    {
      id: 111,
      title: "The Silence of the Lambs",
      year: "1991",
      cover: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    },
    {
      id: 112,
      title: "Gladiator",
      year: "2000",
      cover: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    },
    {
      id: 113,
      title: "Se7en",
      year: "1995",
      cover: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
    },
    {
      id: 114,
      title: "Spirited Away",
      year: "2001",
      cover: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Header />

      <main className="pt-16">
        <HighLightMovie />

        <div className="max-w-7xl mx-auto space-y-8 mt-8 overflow-hidden pb-10">
          <MovieCarousel title="Populares" movies={popularMovies} />

          <MovieCarousel title="Clássicos" movies={classicMovies} />
        </div>
      </main>
    </div>
  );
}

export default HomeScreen;
