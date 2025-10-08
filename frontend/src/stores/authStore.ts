import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User, LoginRequest, RegisterRequest } from '../types/auth';
import {authApi} from '../services/authApi';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);
          
          if (response.status === 'success') {
            const { user, access_token } = response.data;
            
            // Set token in cookies (expires in 1 day)
            Cookies.set('access_token', access_token, { 
              expires: 1,
              secure: true,
              sameSite: 'strict'
            });
            
            set({
              user,
              token: access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || 'Login failed',
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Login failed',
          });
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(userData);
          
          if (response.status === 'success') {
            set({
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || 'Registration failed',
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Registration failed',
          });
        }
      },

      logout: () => {
        Cookies.remove('access_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: () => {
        const token = Cookies.get('access_token');
        if (token) {
          set({
            token,
            isAuthenticated: true,
          });
        } else {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
