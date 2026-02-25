import { useState } from 'react';
import { UserMenu } from './UserMenu';
import { logoutService } from '@features/auth/services/auth.service'; // Usamos el servicio orquestador

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    // El servicio ya se encarga de:
    // 1. Llamar a la API.
    // 2. Limpiar Zustand.
    // 3. Limpiar LocalStorage e invocar la redirección.
    await logoutService();
    setIsMenuOpen(false);
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 md:px-8 flex justify-between items-center relative z-40">
      {/* Sección Izquierda: Breadcrumb Institucional */}
      <nav className="flex items-center gap-3 text-sm">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-900 transition-colors cursor-pointer">
          <span>🏠</span>
        </div>
        <span className="text-slate-300 font-light">/</span>
        <h2 className="font-bold text-slate-600 tracking-tight">Panel de Control</h2>
      </nav>

      {/* Sección Derecha: Perfil de María González */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Badge de Rol con color institucional */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            Rol:
          </span>
          <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-wider">
            Secretaría
          </span>
        </div>

        {/* Contenedor de Usuario */}
        <div className="flex items-center gap-3 relative">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-black text-slate-800 leading-none">María González</p>
            <p className="text-[11px] font-medium text-slate-400 mt-1">secretaria@ucaldas.edu.co</p>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center hover:bg-slate-200 hover:scale-105 transition-all duration-200 active:scale-95"
            aria-label="Abrir menú de usuario"
          >
            <span className="text-slate-600 font-bold text-lg">👤</span>
          </button>

          {/* Menú Desplegable con Overlay para cerrar al hacer clic fuera */}
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute right-0 top-12 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <UserMenu closeMenu={() => setIsMenuOpen(false)} onLogout={handleLogout} />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
