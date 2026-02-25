import React from 'react';

// ✅ Agregamos 'error' a la interfaz para que TypeScript lo reconozca
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // Esta es la clave para que desaparezca el rojo
}

export const CustomInput = ({ label, error, ...props }: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>

      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white shadow-sm placeholder:text-slate-400
          ${
            error
              ? 'border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-500'
              : 'border-slate-200 focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059]'
          }`}
      />

      {/* Si hay un mensaje de error, lo mostramos debajo */}
      {error && (
        <span className="text-[11px] text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};
