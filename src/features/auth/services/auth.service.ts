// 1. Importamos la capa de API tonta y el store
import * as authApi from '../api/auth.api';
import { useAuthStore } from '@store/auth.store';
import type { LoginDTO } from '@shared/validators/auth.validator';

/**
 * Servicio de Autenticación: Orquesta la lógica entre la UI y la API.
 * No usa axios directamente, usa authApi.
 */

// PASO 1: Login inicial
export const loginService = async (data: LoginDTO) => {
  const response = await authApi.login(data);

  // Si el login es exitoso, guardamos el token temporal en el store
  if (response.token) {
    useAuthStore.getState().setToken(response.token);
  }

  return response;
};

// PASO 2: Verificación de 2FA
export const verifyTwoFactorService = async (code: string) => {
  // Obtenemos el token temporal del store
  const tempToken = useAuthStore.getState().token;

  if (!tempToken) throw new Error('No hay un token de sesión activo');

  const response = await authApi.verify2FA({
    code: code.trim(),
    token: tempToken,
  });

  // Si el backend confirma éxito, activamos la sesión de María González
  if (response.success) {
    useAuthStore.getState().completeTwoFactor();

    // Guardamos los tokens finales para los interceptores
    localStorage.setItem('accessToken', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  return response;
};

// PASO 3: Cierre de Sesión
export const logoutService = async () => {
  try {
    await authApi.logoutApi();
  } finally {
    // Siempre limpiamos el cliente, falle o no la petición al servidor
    useAuthStore.getState().logout();
    localStorage.clear();
    window.location.href = '/login';
  }
};
