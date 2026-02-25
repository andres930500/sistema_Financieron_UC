import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { LoginView } from './LoginView';

// Assets
import bgUniversidad from '@assets/image/bg-universidad.png';
import logoAmarillo from '@assets/image/Logo_Amarillo.png';
import logoCidt from '@assets/image/logo-cidtt.png';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    loading,
    apiError,
  } = useLogin();

  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setZoom((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* 🔵 Fondo con efecto Zoom */}
      <div
        className="absolute inset-0 transition-transform duration-[4000ms] ease-in-out z-0"
        style={{
          backgroundImage: `url(${bgUniversidad})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: zoom ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* 🔵 Overlay institucional */}
      <div className="absolute inset-0 bg-blue-950/60 z-0" />

      {/* 🔵 Gradiente lateral para contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-950/40 to-transparent z-0" />

      {/* ✅ SECCIÓN IZQUIERDA – LOGOS AJUSTADOS Y CONTROLADOS */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-8 md:py-0 overflow-hidden">
        <div className="flex items-center justify-center gap-8 md:gap-12 max-w-[90%]">
          <img
            src={logoAmarillo}
            alt="Universidad de Caldas"
            className="
              max-h-40
              sm:max-h-52
              md:max-h-60
              lg:max-h-72
              w-auto
              object-contain
              drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]
              brightness-110
              contrast-110
              transition-transform duration-500
              hover:scale-105
            "
          />

          <img
            src={logoCidt}
            alt="CiDT²"
            className="
              max-h-40
              sm:max-h-52
              md:max-h-60
              lg:max-h-72
              w-auto
              object-contain
              drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]
              brightness-110
              contrast-110
              transition-transform duration-500
              hover:scale-105
            "
          />
        </div>
      </div>

      {/* ✅ SECCIÓN DERECHA – FORMULARIO (SIN MODIFICAR ESTRUCTURA) */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center pb-8 md:pb-0">
        <div className="w-full max-w-md backdrop-blur-sm">
          <LoginView
            register={register}
            onSubmit={handleSubmit}
            loading={loading}
            apiError={apiError}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};
