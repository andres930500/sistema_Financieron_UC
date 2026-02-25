import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  return (
    /* 1. Cambiamos a rounded-[3rem] para el efecto circular extremo del 2FA */
    /* 2. Añadimos shadow-blue-900/30 para que la sombra tenga el tono de la U. de Caldas */
    /* 3. Subimos el padding a p-12 para que respire más el diseño */
    <div className="bg-white/95 backdrop-blur-md p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-900/30 w-full max-w-lg border border-white/20 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        {/* 4. Cambiamos text-slate-800 por el azul oscuro institucional #002855 */}
        <h2 className="text-3xl md:text-4xl font-black text-[#002855] mb-3 tracking-tight">
          {title}
        </h2>
        {/* 5. Subtítulo con un poco más de peso y tamaño */}
        <p className="text-slate-500 font-semibold text-base md:text-lg px-2">{subtitle}</p>
      </div>

      {children}
    </div>
  );
};
