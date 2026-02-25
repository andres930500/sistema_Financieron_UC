import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';
import { MainLayout } from '@/layouts/MainLayout';
import { SecretaryDashboard } from '@features/dashboard/pages/SecretaryDashboard';
import { LoginPage } from '@features/auth/pages/LoginPage';
import { TwoFactorPage } from '@features/auth/pages/TwoFactorPage';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isStepOneComplete = useAuthStore((state) => state.isStepOneComplete);

  // 1. Si no ha hecho ni el Login, lo mandamos al inicio
  if (!isStepOneComplete) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si hizo Login pero NO ha validado el 2FA, lo mandamos a verificar
  if (isStepOneComplete && !isAuthenticated) {
    return <Navigate to="/verify-2fa" replace />;
  }

  // 3. Solo si pasó ambos filtros, puede ver el Dashboard
  return children;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas/Semi-públicas */}
        <Route path="/login" element={<LoginPage />} />

        {/* Solo accesible si isStepOneComplete es true y isAuthenticated es false */}
        <Route path="/verify-2fa" element={<TwoFactorPage />} />

        {/* Rutas Protegidas bajo el nuevo filtro doble */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <SecretaryDashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Redirección inteligente */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
