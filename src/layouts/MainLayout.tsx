import React from 'react';
import { Sidebar } from '@shared/components/Sidebar';
import { Header } from '@shared/components/Header';
import { SECRETARY_MENU } from '@shared/constants/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar Lateral: Recibe el menú institucional. 
        Se mantiene fijo o colapsable según tu implementación interna. 
      */}
      <Sidebar menuItems={SECRETARY_MENU} />

      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Header Superior: Contiene perfil de María González y notificaciones */}
        <Header />

        {/* Área de Contenido Principal:
          - overflow-y-auto permite scroll independiente.
          - animate-in para que el cambio de página no sea brusco.
        */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300">
          <div className="mx-auto max-w-[1400px] animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>

          {/* Footer sutil opcional dentro del scroll */}
          <footer className="mt-12 py-6 text-center border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              SAPFIAI — Sistema de Gestión Financiera — Universidad de Caldas
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};
