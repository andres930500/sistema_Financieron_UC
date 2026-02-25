interface PrimaryButtonProps {
  label: string;
  isLoading?: boolean;
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
}

export const PrimaryButton = ({
  label,
  isLoading,
  type = 'submit',
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      /* 1. bg-[#002855]: El azul marino profundo del 2FA */
      /* 2. rounded-xl: El redondeo exacto de los botones de acción */
      /* 3. py-4: Altura consistente para un área de clic cómoda */
      className="w-full bg-[#002855] hover:bg-[#001d3d] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all transform active:scale-95 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          {/* Spinner sutil para mantener el feedback visual */}
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Procesando...
        </>
      ) : (
        label
      )}
    </button>
  );
};
