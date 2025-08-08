import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'professor';
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student'
  },
  {
    id: '2', 
    name: 'Dr. Sarah Professor',
    email: 'professor@example.com',
    role: 'professor'
  },
  {
    id: '3',
    name: 'Mike Learner',
    email: 'mike@example.com', 
    role: 'student'
  }
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would call an API
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);