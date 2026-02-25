import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginDTO } from '@shared/validators/auth.validator';
import { loginService } from '../services/auth.service';
import axios from 'axios'; // Para tipar el error

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const formMethods = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginDTO) => {
    setApiError(null);
    setLoading(true);

    try {
      await loginService(data);
      // replace: true evita que el usuario regrese al login vacío con el botón "atrás"
      navigate('/auth/verify', { replace: true });
    } catch (error: unknown) {
      let errorMessage = 'Error de conexión con el servidor';

      if (axios.isAxiosError(error)) {
        // Extraemos el mensaje que envía tu API de .NET Core
        errorMessage = error.response?.data?.message || 'Usuario o contraseña incorrectos';
      }

      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    // Exponemos formMethods completo para mayor flexibilidad si necesitas reset() o watch()
    ...formMethods,
    handleSubmit: formMethods.handleSubmit(onSubmit),
    loading,
    apiError,
  };
};
