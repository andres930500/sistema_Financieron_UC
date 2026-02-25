import { ENV } from './env.config';

export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/Authentication/login',
      VERIFY_2FA: '/Authentication/verify-2fa',
      LOGOUT: '/Authentication/logout',
      // Agregamos este para el paso del correo que vimos antes
      SEND_2FA: '/Authentication/send-2fa-code',
      ENABLE_2FA: '/auth/enable-2fa',
    },
    // Espacio listo para cuando integres Proyectos y Presupuestos
    PROJECTS: {
      LIST: '/Projects',
      DETAILS: (id: string) => `/Projects/${id}`,
    },
  },
};
