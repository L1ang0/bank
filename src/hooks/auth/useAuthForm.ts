import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

// базовые схемы
const emailSchema = z.string()
  .min(1, { message: 'Email обязателен' })
  .email({ message: 'Некорректный email' })
  .max(100, { message: 'Email слишком длинный' })

const passwordSchema = z.string()
  .min(8, { message: 'Пароль должен быть не менее 8 символов' })

const baseSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  honeypot: z.string().max(0, { message: 'Это поле должно быть пустым' }).optional()
})

// схемы для разных режимов формы
const loginSchema = baseSchema.extend({
  rememberMe: z.boolean().optional()
})

const registerSchema = baseSchema.extend({
  name: z.string()
    .min(2, { message: 'Имя должно быть не менее 2 символов' })
    .max(50, { message: 'Имя слишком длинное' }),
  phone: z.string()
    .min(10, { message: 'Телефон должен быть в формате +375 (__) ___-__-__' })
    .max(19, { message: 'Телефон слишком длинный' }),
  password: passwordSchema
    .max(50, { message: 'Пароль слишком длинный' })
    .regex(/[A-Z]/, { message: 'Должна быть хотя бы одна заглавная буква' })
    .regex(/[a-z]/, { message: 'Должна быть хотя бы одна строчная буква' })
    .regex(/[0-9]/, { message: 'Должна быть хотя бы одна цифра' })
    .regex(/[^A-Za-z0-9]/, { message: 'Должен быть хотя бы один спецсимвол' })
})

type AuthFormValues = z.infer<typeof baseSchema> & {
  rememberMe?: boolean
  name?: string
  phone?: string
}

// Функция для работы с localStorage
const getStoredCredentials = () => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('rememberedCredentials');
  return stored ? JSON.parse(stored) : null;
};

const setStoredCredentials = (email: string, password: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('rememberedCredentials', JSON.stringify({ email, password }));
};

const clearStoredCredentials = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('rememberedCredentials');
};

const defaultValues: AuthFormValues = {
  email: '',
  password: '',
  rememberMe: false,
  name: '',
  phone: '',
  honeypot: ''
}

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isResetLoading, setIsResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const router = useRouter()
  const DEFAULT_AVATAR_URL = 'https://vrmuwzkelrwnmsoteluq.supabase.co/storage/v1/object/public/avatars/default.png'

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues,
    mode: 'onChange'
  })

  // Загрузка сохраненных данных при монтировании
  useEffect(() => {
    const stored = getStoredCredentials();
    if (stored) {
      setValue('email', stored.email);
      setValue('password', stored.password);
      setValue('rememberMe', true);
      trigger(['email', 'password']);
    }
  }, [setValue, trigger]);

  const password = watch('password')
  const rememberMe = watch('rememberMe')

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0
    if (pass.length >= 8) strength += 1
    if (/[A-Z]/.test(pass)) strength += 1
    if (/[a-z]/.test(pass)) strength += 1
    if (/[0-9]/.test(pass)) strength += 1
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1
    return strength
  }

  const humanizeSupabaseError = (e: unknown) => {
    const error = e as { message?: string };
    const msg = error?.message || '';
    if (/Invalid login credentials/i.test(msg)) return 'Неверный email или пароль';
    if (/User already registered|User already exists/i.test(msg)) return 'Пользователь с таким email уже существует';
    if (/Email not confirmed/i.test(msg)) return 'Сначала подтвердите email через ссылку в письме';
    return msg || 'Что-то пошло не так. Попробуйте ещё раз.';
  };

  const handlePasswordReset = async (email: string) => {
    setIsResetLoading(true)
    setServerError(null)
    setResetSuccess(false)

    try {
      const supabase = createSupabaseBrowserClient(false)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) throw error
      setResetSuccess(true)
      setTimeout(() => setResetSuccess(false), 5000)
    } catch (e) {
      setServerError(humanizeSupabaseError(e))
      setTimeout(() => setServerError(null), 5000)
    } finally {
      setIsResetLoading(false)
    }
  }

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    setIsLoading(true)
    setServerError(null)
    setShowSuccess(false)
  
    try {
      if (data.rememberMe) {
        setStoredCredentials(data.email, data.password)
      } else {
        clearStoredCredentials()
      }
  
      const supabase = createSupabaseBrowserClient(Boolean(data.rememberMe))
  
      if (isLogin) {
        // Логика входа остается прежней
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        })
        if (error) throw error
  
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
        router.push('/')
      } else {
        // При регистрации теперь передаем только email и password
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            // Данные для профиля теперь будут обрабатываться триггером
            data: {
              name: data.name,
              phone: data.phone,
              avatar_url: DEFAULT_AVATAR_URL
            },
            emailRedirectTo: `${window.location.origin}/auth/confirm?next=/`
          }
        })
        if (error) throw error
  
        setShowSuccess(true)
      }
    } catch (e) {
      setServerError(humanizeSupabaseError(e))
      setTimeout(() => setServerError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    reset(defaultValues)
  }

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    let phoneNumber = value.replace(/[^\d+]/g, '');
    if (phoneNumber.length > 13) { phoneNumber = phoneNumber.substring(0, 13) }
    if (phoneNumber.startsWith('+375')) {
      const parts = phoneNumber.match(/^(\+375)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
      if (parts) {
        return `${parts[1]}${parts[2] ? ` (${parts[2]}` : ''}${parts[3] ? `) ${parts[3]}` : ''}${parts[4] ? `-${parts[4]}` : ''}${parts[5] ? `-${parts[5]}` : ''}`;
      }
    }
    if (!phoneNumber.startsWith('+')) phoneNumber = '+' + phoneNumber
    return phoneNumber
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value);
    setValue('phone', formatted, { shouldValidate: true });
  };

  const getError = (field: keyof AuthFormValues): string | undefined => {
    return errors[field]?.message as string | undefined
  }

  return {
    isLogin,
    showPassword,
    isLoading,
    serverError,
    showSuccess,
    passwordStrength,
    isResetLoading,
    resetSuccess,
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    trigger,
    errors,
    isValid,
    password,
    rememberMe,
    calculatePasswordStrength,
    setShowPassword,
    setPasswordStrength,
    toggleAuthMode,
    handlePhoneChange,
    handlePasswordReset,
    getError,
    setServerError
  }
}