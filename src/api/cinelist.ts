import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type AuthenticationProps = {
  email: string;
  password: string;
};
type AuthenticationResponse = {
  success: boolean;
  accessToken?: string;
};
export async function authenticate(
  props: AuthenticationProps,
): Promise<AuthenticationResponse> {
  const response = await api.post<AuthenticationResponse>(
    "/auth/sign-in",
    props,
  );
  return response.data;
}

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};
type RegisterResponse = {
  success: boolean;
  accessToken?: string;
};
export async function register(
  props: RegisterProps,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/sign-up", props);
  return response.data;
}

export type MeResponse = {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      image_url: string;
      created_at: string;
      updated_at: string;
    };
    favorites: Movie[];
    toWatch: Movie[];
    watched: Rating[];
  };
};
export async function me(): Promise<MeResponse> {
  const response = await api.get<MeResponse>("/user/me");
  return response.data;
}

export type Movie = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  releasedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  tmdbRate: number | null;
};

export type Rating = {
  rate: number;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  movie?: Movie;
};

type Actor = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

type Cast = Actor[];

type GetTopMoviesResponse = {
  success: boolean;
  data: {
    classics: Movie[];
    highlights: Movie[];
    newReleases: Movie[];
  };
};

export async function getTopMovies(): Promise<GetTopMoviesResponse> {
  const response = await api.get<GetTopMoviesResponse>("/movies/top-movies");
  return response.data;
}

type SearchMovieResponse = {
  success: boolean;
  data: Movie[];
};

export async function searchMovie(query: string): Promise<SearchMovieResponse> {
  const response = await api.get<SearchMovieResponse>("/movies/search", {
    params: { term: query },
  });
  return response.data;
}

export type GetMovieResponse = {
  success: boolean;
  data: {
    movie: Movie;
    cast: Cast[];
    ratings: Rating[];
  };
};
export async function getMovie(id: string): Promise<GetMovieResponse> {
  const response = await api.get<GetMovieResponse>("/movies/by-id/" + id);
  return response.data;
}

export type CreateRatingProps = {
  movieId: string;
  rate: number;
  description: string;
};

type CreateRatingResponse = {
  success: boolean;
  message?: string;
};

export async function createRating(
  props: CreateRatingProps,
): Promise<CreateRatingResponse> {
  const response = await api.post<CreateRatingResponse>(
    "/movies/watched",
    props,
  );
  return response.data;
}

type AddMovieProps = {
  movieId: string;
};
export async function addFavorite(props: AddMovieProps): Promise<void> {
  const response = await api.post<void>("/movies/favorite", props);
  return response.data;
}

export async function addToWatch(props: AddMovieProps): Promise<void> {
  const response = await api.post<void>("/movies/to-watch", props);
  return response.data;
}
