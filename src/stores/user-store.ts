import { create } from 'zustand';
import { me, type Movie } from '../api/cinelist';

type User = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

type UserStore = {
  user: User | null;
  favorites: Movie[];
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  favorites: [],
  loading: false,
  error: null,
  
  fetchUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, favorites: [], loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await me();
      if (response.success && response.data) {
        set({ 
          user: response.data.user, 
          favorites: response.data.favorites || [],
          loading: false, 
          error: null 
        });
      } else {
        set({ user: null, favorites: [], loading: false, error: "Erro ao buscar dados do usuário" });
      }
    } catch (error: any) {
      // Se der erro (token inválido, etc), limpa o token e o usuário
      localStorage.removeItem('token');
      set({ user: null, favorites: [], loading: false, error: error.message });
    }
  },
  
  setUser: (user) => set({ user }),
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, favorites: [], error: null });
  },
}));

