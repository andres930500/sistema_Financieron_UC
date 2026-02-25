import axios from 'axios';
/* Importación de tipo estricta para el store si fuera necesario */
import { useAuthStore } from '@store/auth.store';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000, // 15 segundos máximo para servicios de la U. de Caldas
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de PETICIÓN
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      // Usamos la sintaxis moderna de headers de Axios
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de RESPUESTA
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { logout } = useAuthStore.getState();

    // 401: Unauthorized (Token expirado o inválido)
    if (error.response?.status === 401) {
      console.warn('Sesión expirada o no autorizada. Limpiando estado...');
      logout();

      /* Evitamos window.location si es posible. 
         Si el usuario está en una PrivateRoute, 
         el sistema lo sacará al Login automáticamente al detectar que token === null 
      */
      if (!window.location.pathname.includes('/login')) {
        window.location.replace('/login'); // .replace es mejor que .href para no ensuciar el historial
      }
    }

    // Manejo de errores de red o servidor 500
    const customError = {
      message: error.response?.data?.message || 'Error inesperado en el servidor institucional',
      status: error.response?.status,
      originalError: error,
    };

    return Promise.reject(customError);
  },
);

export { api };
