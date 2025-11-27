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

type MeResponse = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  created_at: string;
  updated_at: string;
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
