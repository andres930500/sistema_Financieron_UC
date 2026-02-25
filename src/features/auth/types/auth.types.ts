// request para verify-2fa
export interface TwoFactorVerifyRequest {
  code: string;
  token: string;
}

// response de verify-2fa
export interface TwoFactorVerifyResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  refreshTokenExpiry: string;
  message: string;
  errors: string[] | null;
  user: {
    id: string;
    email: string;
    userName: string;
    phoneNumber: string | null;
    twoFactorEnabled: boolean;
    lastLoginDate: string;
    lastLoginIp: string;
  };
}

// response de enable-2fa
export interface EnableTwoFactorResponse {
  qrCodeUrl: string;
  secret: string;
}

// ✅ NUEVO - response de login
export interface LoginResponse {
  success: boolean;
  token: string;
  refreshToken: string | null;
  refreshTokenExpiry: string | null;
  message: string;
  errors: string[] | null;
  requires2FA: boolean;
  user: {
    id: string;
    email: string;
    userName: string;
    phoneNumber: string | null;
    twoFactorEnabled: boolean;
    lastLoginDate: string;
    lastLoginIp: string;
  };
}
