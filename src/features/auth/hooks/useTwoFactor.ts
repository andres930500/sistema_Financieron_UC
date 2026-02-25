import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@store/auth.store';

export const useTwoFactor = (durationInSeconds: number) => {
  const expirationTime = useAuthStore((state) => state.expirationTime);
  const setExpirationTime = useAuthStore((state) => state.setExpirationTime);

  const [seconds, setSeconds] = useState(durationInSeconds);
  const [expired, setExpired] = useState(false);

  // 1. ResetTimer solo se dispara por acción del usuario (botón reenviar)
  const resetTimer = useCallback(() => {
    const newEndTime = Date.now() + durationInSeconds * 1000;
    setExpirationTime(newEndTime);
    setExpired(false);
    setSeconds(durationInSeconds);
  }, [durationInSeconds, setExpirationTime]);

  // 2. Efecto de Inicialización: Solo corre una vez al montar
  useEffect(() => {
    if (!expirationTime) {
      const initEndTime = Date.now() + durationInSeconds * 1000;
      setExpirationTime(initEndTime);
    }
  }, []); // 👈 Array vacío: Solo inicializa si no existe al cargar

  // 3. Efecto del Intervalo: Solo depende del expirationTime del Store
  useEffect(() => {
    if (!expirationTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((expirationTime - now) / 1000));

      setSeconds(timeLeft);

      if (timeLeft <= 0) {
        setExpired(true);
        clearInterval(interval);
      } else {
        setExpired(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]); // 👈 Ya no depende de resetTimer, eliminando el bucle

  return { seconds, expired, resetTimer };
};
