import api from '@api';
import { API_CONFIG } from '@config/api.config';
import type {
  TwoFactorVerifyRequest,
  TwoFactorVerifyResponse,
  EnableTwoFactorResponse,
  LoginResponse,
} from '../types/auth.types';
import type { LoginDTO } from '@shared/validators/auth.validator';

// ✅ Login
export const login = async (data: LoginDTO): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

// ✅ Verify 2FA
export const verify2FA = async (data: TwoFactorVerifyRequest): Promise<TwoFactorVerifyResponse> => {
  const response = await api.post<TwoFactorVerifyResponse>(
    API_CONFIG.ENDPOINTS.AUTH.VERIFY_2FA,
    data,
  );
  return response.data;
};

// ✅ Enable 2FA
export const enable2FA = async (): Promise<EnableTwoFactorResponse> => {
  const response = await api.post<EnableTwoFactorResponse>(API_CONFIG.ENDPOINTS.AUTH.ENABLE_2FA);
  return response.data;
};
// ✅ Logout (Agrégalo al final de tu archivo)
export const logoutApi = async (): Promise<void> => {
  await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT || '/auth/logout');
};
