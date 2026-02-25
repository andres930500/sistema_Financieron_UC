export const ENV = {
  // Priorizamos la variable de entorno, de lo contrario usamos el proxy relativo
  API_URL: import.meta.env.VITE_API_URL || '/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'SAPFIAI - U. Caldas',
  IS_PRODUCTION: import.meta.env.PROD,
};
