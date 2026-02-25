import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';

// Módulo de Autenticación
import { LoginPage } from '@features/auth/pages/LoginPage';
import { TwoFactorPage } from '@features/auth/pages/TwoFactorPage';

// Módulo de Dashboard y Layout
import { MainLayout } from './layouts/MainLayout';
import { SecretaryDashboard } from '@features/dashboard/pages/SecretaryDashboard';

function App() {
  const { isAuthenticated, isStepOneComplete } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. RUTAS PÚBLICAS */}
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />}
        />

        {/* 2. RUTA DE VERIFICACIÓN (Paso 2) */}
        <Route
          path="/auth/verify"
          element={
            isStepOneComplete && !isAuthenticated ? <TwoFactorPage /> : <Navigate to="/login" />
          }
        />

        {/* 3. RUTAS PROTEGIDAS (Solo tras 2FA exitoso) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <MainLayout>
                <SecretaryDashboard />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 4. REDIRECCIÓN POR DEFECTO */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
