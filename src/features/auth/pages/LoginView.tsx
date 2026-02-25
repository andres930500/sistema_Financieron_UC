import { useState } from 'react';
import { CustomInput } from '@shared/components/CustomInput';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { AuthCard } from '@shared/components/AuthCard';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LoginDTO } from '@shared/validators/auth.validator';

interface LoginViewProps {
  register: UseFormRegister<LoginDTO>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
  apiError: string | null;
  errors: FieldErrors<LoginDTO>;
}

export const LoginView = ({
  register,
  onSubmit,
  loading,
  apiError,
  errors = {}, // ✅ Evita que 'errors' sea undefined
}: LoginViewProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <AuthCard title="Acceso Seguro" subtitle="Ingrese sus credenciales institucionales">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Alerta de Error de API */}
          {apiError && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-2xl border border-red-100 font-bold animate-shake">
              {apiError}
            </div>
          )}

          {/* Input de Correo */}
          <div className="space-y-1">
            <CustomInput
              label="Correo Institucional"
              {...register('email')}
              // ✅ Acceso seguro a errores
              error={errors?.email?.message}
              placeholder="ejemplo@ucaldas.edu.co"
              autoComplete="email"
            />
          </div>

          {/* Contraseña con toggle */}
          <div className="relative space-y-1">
            <CustomInput
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              // ✅ Acceso seguro a errores
              error={errors?.password?.message}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-[42px] text-slate-400 hover:text-[#C5A059] transition-colors p-1"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="pt-2">
            <PrimaryButton type="submit" isLoading={loading} label="Continuar" />
          </div>

          <p className="text-center text-sm text-slate-500 pt-2">
            ¿Problemas para acceder?{' '}
            <a
              href="mailto:soporte@ucaldas.edu.co"
              className="text-[#C5A059] font-bold hover:underline transition-all"
            >
              Soporte Técnico
            </a>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

// Sub-componentes de iconos para limpiar el render principal
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
    />
  </svg>
);
