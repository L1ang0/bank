'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ThemeToggle from '../ThemeToggle'

export default function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
  {/* Многоуровневый градиентный фон */}
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-400 to-orange-300 dark:from-indigo-700 dark:via-purple-800 dark:to-pink-700" />

  <motion.div
    className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pink-400 blur-3xl"
  />
  <motion.div
    className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-orange-300 blur-3xl"
  />
  <motion.div
    className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-purple-400 blur-2xl"
  />
  
      {/* Контейнер для кнопок вверху */}
      <div className="absolute top-2 max-[600px]:top-7.5 left-0 right-0 px-6 z-20 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-red-400 to-rose-500 dark:from-emerald-300 dark:to-green-400 backdrop-blur-lg px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all"
        >
          <motion.div 
            whileHover={{ x: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="flex items-center"
          >
            <svg className="xl:w-6 xl:h-6 h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </motion.div>
          <span className="md:text-sm text-[12px] font-semibold  text-[#ffc2d4] dark:text-[#c1fffb]  ">
            Главное меню
          </span>
        </motion.button>
  
        {/* Стилизованный ThemeToggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center"
        >
          <div className="bg-gradient-to-br xl:h-17 md:h-15 sm:h-15 h-12 md:pr-5 pr-3.5  md:p-0.5 p-0 from-orange-400 to-rose-500 dark:from-indigo-500 dark:to-pink-600 backdrop-blur-lg  rounded-3xl shadow-xl">
            <ThemeToggle />
          </div>
        </motion.div>
      </div>
  
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[70vw] max-sm:max-w-[85vw] mx-auto mt-3 max-[600px]:mt-0 flex relative"
      >
        {/* общая цветная тень для всего контейнера */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-rose-500 
                    dark:from-cyan-500 dark:to-purple-600 rounded-3xl blur-xl opacity-30"
        />

        {/* Левая часть - форма */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative flex-1 z-10"
        >

    <motion.div 
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md min-[1000px]:rounded-l-xl max-[1000px]:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 h-full"
    >
      {/* Заголовок формы */}
      <div className="relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-orange-400 to-rose-500 dark:from-blue-500 dark:to-purple-600 p-4 text-center"
        >
          <h1 className="sm:text-3xl text-2xl font-bold text-white tracking-tight">
            {isLogin ? 'Добро пожаловать' : 'Создайте аккаунт'}
          </h1>
          <p className="mt-2 lg:text-xl md:text-[18px] text-[16px] text-orange-100 dark:text-blue-100 italic">
            {isLogin ? 'Войдите в свой аккаунт' : 'Начните использовать сервис'}
          </p>
        </motion.div>
        
        {/* Декоративные круги */}
        <motion.div 
          className="absolute -right-20 -top-20 w-40 h-40 rounded-full border-4 border-white/10"
        />
        <motion.div 
          className="absolute -left-10 -bottom-10 w-24 h-24 rounded-full border-2 border-white/10"
        />
      </div>

    {/* Тело формы */}
    <form onSubmit={handleSubmit} className="pt-3 p-6 space-y-2">
    {!isLogin && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-1"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Имя</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500 dark:text-blue-400">
              <UserIcon />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm transition-all duration-300 hover:shadow-md"
              placeholder="Ваше полное имя"
              required
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Телефон</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500 dark:text-blue-400">
              <PhoneIcon />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm transition-all duration-300 hover:shadow-md"
              placeholder="+375 (__) ___-__-__"
              required
              minLength={13}
              maxLength={17}
            />
          </div>
        </motion.div>
      </>
    )}

  {/* Поле Email с улучшенным дизайном */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-2"
  >
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500 dark:text-blue-400">
        <EmailIcon />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm transition-all duration-300 hover:shadow-md"
        placeholder="your@email.com"
        required
      />
    </div>
  </motion.div>

  {/* Поле пароля с эффектом стекла */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    className="space-y-2"
  >
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Пароль</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500 dark:text-blue-400">
        <LockIcon />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full pl-11 pr-11 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm transition-all duration-300 hover:shadow-md"
        placeholder="••••••••"
        required
        minLength={6}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </motion.button>
    </div>
    <div className="text-xs text-gray-500 dark:text-gray-400 ml-1">
      Минимум 6 символов
    </div>
  </motion.div>

  {/* Кнопка отправки с градиентом и эффектом свечения */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className="pt-1"
  >
    <motion.button
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px -5px var(--shadow-color)'
      }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isLoading}
      className={`w-full [--shadow-color:rgba(239,68,68,0.5)] 
      dark:[--shadow-color:rgba(59,130,246,0.5)] py-3 px-6 rounded-xl font-semibold text-white 
      transition-all duration-300 relative cursor-pointer overflow-hidden ${
        isLoading 
          ? 'bg-red-400 dark:bg-blue-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-red-400  to-red-500 dark:from-blue-500 dark:via-blue-600 dark:to-blue-500 hover:from-red-500  hover:to-red-500 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-blue-600 shadow-lg'
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <SpinnerIcon />
          <span>{isLogin ? 'Вход...' : 'Регистрация...'}</span>
        </span>
      ) : (
        <>
          <span className="relative max-sm:text-[15px] z-10">{isLogin ? 'Войти в систему' : 'Зарегистрироваться'}</span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
          />
        </>
      )}
    </motion.button>
  </motion.div>

      {/* Дополнительные ссылки с анимацией */}
      {isLogin && (
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex justify-between items-center pt-2"
      >
        <div className="flex items-center">
          <input 
            id="remember-me" 
            type="checkbox" 
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
            Запомнить меня
          </label>
        </div>
        <a 
          href="#" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
        >
          Забыли пароль?
        </a>
      </motion.div>
    )}
    </form>
      {/* Переключатель между входом и регистрацией */}
      <div className="-mb-2 relative flex ">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-5 text-center font-medium transition-colors duration-500 relative z-10 cursor-pointer ${
            isLogin 
              ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 dark:from-emerald-500 dark:to-blue-500 dark:hover:from-emerald-500 dark:hover:to-blue-600' 
              : 'text-gray-600 dark:text-gray-400 bg-gray-100/50 hover:bg-gradient-to-r hover:from-orange-300/30 hover:to-red-300/30 dark:bg-gray-800/50 dark:hover:from-emerald-300/10 dark:hover:to-blue-300/10'
          }`}
        >
          Вход
          {isLogin && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-1 bg-white dark:bg-blue-200"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-5 text-center font-medium transition-colors duration-300 relative z-10 cursor-pointer ${
            !isLogin 
              ? 'text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 dark:from-emerald-500 dark:to-blue-500 dark:hover:from-emerald-500 dark:hover:to-blue-600' 
              : 'text-gray-600 dark:text-gray-400 bg-gray-100/50 hover:bg-gradient-to-r hover:from-orange-300/30 hover:to-red-300/30 dark:bg-gray-800/50 dark:hover:from-emerald-300/10 dark:hover:to-blue-300/10'
          }`}
        >
          Регистрация
          {!isLogin && (
            <motion.div 
              layoutId="activeTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-1 bg-white dark:bg-blue-200"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      </div>
    </motion.div>
  </motion.div>

      {/* Правая часть - изображение */}
      <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
          className="hidden min-[1000px]:flex flex-1 relative z-10 "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/80 to-orange-600/40 dark:from-blue-700/40 dark:to-purple-800/80 rounded-r-xl overflow-hidden shadow-2xl">

          </div>
          
          {/* Основное изображение */}
          <div className="relative z-10 flex items-center justify-center h-full w-full p-2 xl:p-4 :pl-5 xl:pl-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative"
              key={isLogin ? "login" : "register"}
            >
              {isLogin ? (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src="login5.svg"
                  alt="Welcome Illustration"
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              ) : (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src="login6.svg"
                  alt="Register Illustration"
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              )}
              
              {/* Блок с сообщением, меняющий положение при переключении */}
                <motion.div
                key={isLogin ? "login-message" : "register-message"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`
                  absolute 
                  ${isLogin 
                    ? 'top-[13%] left-[1%] min-[1000px]:top-[13.5%] min-[1000px]:left-[-1.5%] min-[1100px]:top-[15.5%] min-[1100px]:left-[-1.5%] min-[1200px]:top-[18%] min-[1200px]:left-[-1.5%] min-[1280px]:top-[17%] min-[1280px]:left-[-7%] min-[1360px]:top-[19%] min-[1360px]:left-[-7.5%] min-[1439px]:top-[21.5%] min-[1439px]:left-[-7.5%]' 
                    : 'top-[13%] left-[1%] min-[1000px]:top-[-25%] min-[1000px]:left-[21%] min-[1100px]:top-[-23%] min-[1100px]:left-[23.5%] min-[1200px]:top-[-21%] min-[1200px]:left-[25%] xl:top-[-20.5%] xl:left-[26%]'
                  }
                  bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 md:p-4 
                  rounded-xl shadow-lg w-auto max-w-[80%] transition-all duration-300
                `}
              >
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {isLogin ? 'С возвращением!' : 'Присоединяйтесь к нам!'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isLogin ? 'Мы по вам скучали' : 'Начните прямо сейчас'}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}


// Иконки (остаются без изменений)
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
)