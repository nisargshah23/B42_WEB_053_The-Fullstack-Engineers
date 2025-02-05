import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      username,
      email: `${username}@example.com`,
      role: 'manager',
      name: 'John Doe',
    };
    set({ user: mockUser });
  },
  logout: () => set({ user: null }),
}));