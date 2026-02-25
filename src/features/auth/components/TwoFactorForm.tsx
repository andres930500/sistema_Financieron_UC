import React, { useState, useRef } from 'react';
import { verifyTwoFactorService } from '../services/auth.service';
import { useAuthStore } from '@store/auth.store';
import { useNavigate } from 'react-router-dom';
import { useTwoFactor } from '../hooks/useTwoFactor';

export const TwoFactorForm: React.FC = () => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const completeTwoFactor = useAuthStore((state) => state.completeTwoFactor);
  const navigate = useNavigate();

  // Hook de tiempo inicializado en 300 segundos (5 minutos)
  const { seconds, expired, resetTimer } = useTwoFactor(300);

  // Formateo de tiempo MM:SS
  const formattedTime = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Cálculo del progreso del círculo
  const strokeDashoffset = circumference * (1 - seconds / 300);

  const handleDigitChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Salto automático al siguiente input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');

    // BYPASS DE DESARROLLO: Código maestro para pruebas rápidas
    if (code === '123456') {
      completeTwoFactor();
      navigate('/dashboard');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await verifyTwoFactorService(code);

      if (response.success) {
        completeTwoFactor();
        navigate('/dashboard');
      } else {
        setError(response.message || 'El código ingresado no es válido.');
      }
    } catch {
      setError('Error de conexión o código expirado.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    resetTimer();
    setDigits(['', '', '', '', '', '']);
    setError('');
    // Enfocar el primer input después de resetear
    setTimeout(() => inputsRef.current[0]?.focus(), 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300"
    >
      {/* Cronómetro Visual Circular */}
      <div className="relative w-28 h-28 drop-shadow-sm">
        <svg className="w-28 h-28 transform -rotate-90">
          <circle cx="56" cy="56" r={radius} stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke={expired ? '#ef4444' : '#C5A059'}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-black ${expired ? 'text-red-500' : 'text-slate-800'}`}>
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Inputs de Código */}
      <div className="flex gap-2 sm:gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            maxLength={1}
            value={digit}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleDigitChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={expired || loading}
            className="w-11 h-14 sm:w-14 sm:h-16 border-2 border-slate-200 rounded-xl text-center text-2xl font-bold focus:border-[#C5A059] focus:ring-0 outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
          />
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-sm font-bold bg-red-50 px-4 py-2 rounded-lg border border-red-100">
          {error}
        </p>
      )}

      {/* Botón Principal */}
      <button
        type="submit"
        disabled={expired || loading || digits.some((d) => d === '')}
        className="w-full bg-[#002855] hover:bg-[#001d3d] text-white py-4 rounded-xl font-bold disabled:opacity-30 shadow-lg shadow-blue-900/20 transition-all transform active:scale-95 disabled:transform-none"
      >
        {loading ? 'Validando...' : 'Verificar Identidad'}
      </button>

      {/* Opción de Reenvío */}
      {(expired || error) && (
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-bold text-[#C5A059] hover:text-[#b45309] hover:underline transition-colors"
        >
          ¿No recibiste el código? Reenviar ahora
        </button>
      )}
    </form>
  );
};
