import { create } from 'zustand';
import { me } from '../api/cinelist';

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
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  
  fetchUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ user: null, loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const userData = await me();
      set({ user: userData, loading: false, error: null });
    } catch (error: any) {
      // Se der erro (token inválido, etc), limpa o token e o usuário
      localStorage.removeItem('token');
      set({ user: null, loading: false, error: error.message });
    }
  },
  
  setUser: (user) => set({ user }),
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, error: null });
  },
}));

