import { AuthState } from '@/types/authType';
import { create } from 'zustand';

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
    set({ accessToken: token });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    set({ accessToken: null, user: null });
  },

  initUser: async () => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      get().logout();
      return;
    } else {
      set({ accessToken: token });
    }
  },

  isLoggedIn: () => !!get().accessToken,
}));
