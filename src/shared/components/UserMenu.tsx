import React from 'react';

interface UserMenuProps {
  closeMenu: () => void;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ closeMenu, onLogout }) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
      {/* Cabecera del Menú: Identidad del Usuario */}
      <div className="px-5 py-4 border-b border-slate-50">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mb-1">
          Sesión Activa
        </p>
        <p className="text-sm font-black text-slate-800 leading-tight">María González</p>
        <p className="text-[10px] text-[#C5A059] font-bold mt-0.5">Secretaría General</p>
      </div>

      {/* Opciones de Cuenta */}
      <div className="py-2">
        <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-600 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <span className="text-sm group-hover:scale-110 transition-transform">🛡️</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-700">Seguridad 2FA</p>
            <p className="text-[10px] text-slate-400 font-medium">Gestionar autenticación</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-600 transition-all group">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
            <span className="text-sm group-hover:scale-110 transition-transform">🔑</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-700">Contraseña</p>
            <p className="text-[10px] text-slate-400 font-medium">Actualizar acceso</p>
          </div>
        </button>
      </div>

      {/* Acción de Salida */}
      <div className="border-t border-slate-50 mt-1 pt-1">
        <button
          onClick={() => {
            onLogout();
            closeMenu();
          }}
          className="w-full flex items-center gap-3 px-5 py-4 hover:bg-rose-50 text-rose-500 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-100/50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
            <span className="text-sm group-hover:translate-x-0.5 transition-transform">🚪</span>
          </div>
          <p className="text-[11px] font-black uppercase tracking-widest">Cerrar Sesión</p>
        </button>
      </div>
    </div>
  );
};
