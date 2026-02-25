import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthData {
  token: string | null;
  isAuthenticated: boolean;
  isStepOneComplete: boolean;
  expirationTime: number | null;
}

interface AuthActions {
  setToken: (token: string) => void;
  completeTwoFactor: () => void;
  setExpirationTime: (time: number | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthData & AuthActions>()(
  persist(
    (set) => ({
      // Estado Inicial
      token: null,
      isAuthenticated: false,
      isStepOneComplete: false,
      expirationTime: null,

      // Acciones
      setToken: (token) =>
        set({
          token,
          isStepOneComplete: true,
          isAuthenticated: false,
        }),

      completeTwoFactor: () =>
        set({
          isAuthenticated: true,
          isStepOneComplete: true, // Nos aseguramos que ambos estén en true
        }),

      setExpirationTime: (time) => set({ expirationTime: time }),

      logout: () => {
        // Limpiamos todo el estado
        set({
          token: null,
          isAuthenticated: false,
          isStepOneComplete: false,
          expirationTime: null,
        });
        // Opcional: Limpiar explícitamente el storage si es necesario
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Parte de la auditoría: Solo persistir el token y el progreso si lo deseas
      // partialize: (state) => ({ token: state.token, isStepOneComplete: state.isStepOneComplete }),
    },
  ),
);
