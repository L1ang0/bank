'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import React from 'react'

export default function MainContent() {

  const scrollToAbout = () => {
    const el = document.getElementById("about")
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };
  
  const faqData = [
    {
      q: '➡️ Как открыть счёт онлайн?',
      a: '✅ Вы можете открыть счёт через мобильное приложение или личный кабинет на сайте.',
    },
    {
      q: '➡️ Какие документы нужны для кредита?',
      a: '✅ Паспорт гражданина РБ и справка о доходах за последние 3 месяца.',
    },
    {
      q: '➡️ Где можно пополнить счёт без комиссии?',
      a: '✅ Во всех наших банкоматах и партнёрских сетях без комиссии.',
    },
    {
      q: '➡️ Можно ли досрочно погасить кредит?',
      a: '✅ Да, досрочное погашение доступно без штрафов. Обратитесь в отделение или оформите заявку онлайн.',
    },
    {
      q: '➡️ Как восстановить доступ к интернет-банкингу?',
      a: '✅ Вы можете восстановить доступ через форму восстановления на сайте или обратиться в службу поддержки.',
    },
  ];

  return (
    <section className="space-y-16">

      {/* Hero */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="max-sm:mb-[20px] max-md:mb-[20px] md:m-0 sm:-m-2 -m-5 bg-gradient-to-r from-red-500 to-red-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700  text-white dark:text-gray-300 rounded-2xl md:p-10 sm:p-7 p-7 md:h-[500px] sm:h-[500px] h-[380px] flex flex-col md:flex-row justify-between items-center shadow-lg"
>

  <div className="md:space-y-4 sm:space-y-2 space-y-1 md:max-w-[600px] sm:max-w-[400px] max-w-[200px] w-full">
    <h1 className="md:text-5xl sm:text-[24px] text-[20px] md:mb-5 sm:mb-2 mb-5 text-text font-bold leading-snug">
      БГБ Банк — Ваш финансовый партнёр
    </h1>
    <p className="md:text-2xl sm:text-[18px] text-[14px] md:mb-0 sm:mb-2 mb-4 text-blue-50">
      Современные банковские решения для жизни и бизнеса.<br/>
      <span className="text-white dark:text-gray-200 md:mb-0 sm:mb-2 mb-4 font-light md:text-[32px] sm:text-[26px] text-[13px] underline md:decoration-3 sm:decoration-3 decoration-2 underline-offset-6 decoration-white">
        Быстро. Надёжно. Онлайн
      </span>.
    </p>
    <div className="max-md:flex max-md:justify-center">
    <button onClick={scrollToAbout}
     className="lg:mt-8 mt-4 px-6 py-2 md:h-auto sm:h-[35px] h-[30px]  md:text-[16px] sm:text-[14px] text-[12px] bg-white 
     dark:bg-blue-100 text-[var(--color-secondary)] font-semibold rounded-lg
     dark:hover:bg-blue-200 hover:bg-red-100 hover:rotate-1 hover:scale-102 transition-all cursor-pointer duration-400 transform">
      Подробнее о нас
    </button>
    </div>
  </div>

  <div className="relative mt-6 md:mt-0">
    <motion.div
      className="inline-block"
      animate={{
        rotate: [0, -5, 5, -3, 3, 0],
        y: -10,
        scale: 1.05,
        filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.6))",
        transition: {
          rotate: {
            duration: 1.8,
            repeat: Infinity,
            ease: "linear"
          },
          y: {
            type: "spring",
            stiffness: 300,
            damping: 10
          },
          scale: {
            duration: 0.7
          }
        }
      }}
    >
      <img
        src="/logo.png"
        alt="Bank Logo"
        className="md:w-[800px] sm:w-[500px] w-[250px] md:h-auto sm:h-auto h-[85px] max-sm:-mt-[5px]  
        drop-shadow-lg dark:brightness-85 dark:contrast-110 dark:sepia-[0.3] dark:hue-rotate-[210deg] dark:saturate-200"
      />
    </motion.div>
  </div>
</motion.div>


      {/* Услуги банка */}
      <div className='max-md:mt-[10px] md:mt-[16px]'>
        <h2 className="md:text-3xl sm:text-2xl text-2xl font-bold text-[var(--color-secondary)] md:mb-4 mb-6">Наши продукты</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-6 sm:gap-5 gap-4">
          {[
            { title: 'Депозиты', desc: 'Ставки до 12% годовых. Гибкие сроки и условия.', icon: '💰' },
            { title: 'Кредиты', desc: 'Потребительские, ипотека, бизнес. Быстрое одобрение.', icon: '🏠' },
            { title: 'Интернет-банк', desc: 'Полный контроль над финансами 24/7.', icon: '📱' },
          ].map((item, i) => (
            
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
              key={i}
              whileHover={{
                scale: 1.03,
                rotate: [0, -1.5, 1.5, -1.5, 1.5, 0],
                transition: {
                rotate: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                },
              scale: { 
                duration: 0.7,
                type: "spring"
      }
    }
  }}

        className="bg-[var(--color-card)] md:p-6 sm:p-4 p-4 rounded-xl shadow hover:shadow-xl"
>
        <div className="md:text-4xl sm:text-2xl text-2xl mb-2">{item.icon}</div>
        <h3 className="md:text-xl text-[var(--color-secondary)] sm:text-[18px] text-[16px] font-semibold mb-1">{item.title}</h3>
        <p className="text-gray-600 dark:text-gray-800 md:text-xl sm:text-[18px] text-[14px]">{item.desc}</p>
      </motion.div>
          ))}
        </div>
      </div>

      {/* Преимущества */}
      <motion.div 
      initial={{ opacity: 0, y: -20, x:30 }}
      animate={{ opacity: 1, y: 0, x:0 }}
      transition={{ duration: 0.8 }}
      className="bg-[var(--color-card)] p-8 rounded-xl max-md:-mt-[50px] max-sm:-ml-[10px] max-sm:-mr-[10px]">
        <h2 className="md:text-3xl sm:text-3xl text-xl font-bold text-[var(--color-secondary)] mb-6">Почему выбирают нас</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-6 sm:gap-5 gap-3">
          {[
            '20+ лет на рынке',
            'Надёжная система безопасности',
            'Быстрое обслуживание клиентов',
            'Поддержка онлайн 24/7',
            'Широкая сеть банкоматов',
            'Индивидуальный подход к каждому',
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <CheckCircle className="text-[var(--color-secondary)] mt-1 sm:w-5 w-4 sm:h-5 h-4 flex-shrink-0 " />
              <span className="text-gray-700  md:text-[20px] sm:text-[18px] text[16px] font-bold">{benefit}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* О банке */}
      <motion.div
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative rounded-xl overflow-hidden  max-md:-mt-[50px]"
    >
  <div className="relative pl-5 pt-10 bg-gradient-to-r from-red-500 to-red-600 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700 bg-opacity-70 max-md:h-[450px] max-sm:h-[400px]">
    <h2 className="md:text-3xl sm:text-2xl text-xl font-bold mb-3 text-blue-50 dark:text-blue-100">О БГБ Банке</h2>
    <div className="md:flex items-center justify-between">
      <p className="md:-mt-15 md:text-lg sm:text-[14px] text-[10px] max-w-3xl text-blue-50 dark:text-blue-100">
        Мы — современный, надёжный банк, который помогает миллионам белорусов решать финансовые задачи. Наши решения — это доверие, безопасность и инновации. БГБ Банк входит в список крупнейших банков страны и активно развивается в цифровой среде.
      </p>
      <motion.img
        src="/bankSymb.jpg"
        alt="Bank Symb"
        className="
          h-50 w-60 max-sm:h-35 max-sm:w-35 max-sm:ml-2 max-sm:justify-center mb-8 rounded-xl
          md:mr-15 md:-mt-15 
          mx-auto mt-4 block dark:brightness-75 dark:contrast-110
        "
        initial={{ 
          filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.4))",
          rotate: 0
        }}
        whileHover={{
          y: -2,
          x: -15,
          scale: 1.05,
          filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.6))",
          transition: {
            rotate: {
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            },
            y: {
              type: "spring",
              stiffness: 300,
              damping: 10
            },
            scale: {
              duration: 0.7
            }
          }
        }}
      />
    </div>
  </div>
</motion.div>

{/* Современные решения */}  
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="grid md:grid-cols-2 grid-cols-1 bg-[var(--color-card)] rounded-xl shadow overflow-hidden max-md:-mt-[50px]"
>
  <div className="p-8 flex flex-col justify-center bg-gradient-to-b from-blue-50 to-white dark:bg-gradient-to-b dark:from-blue-50 dark:to-blue-100">
    <h2 className="text:xl sm:text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mb-4">
      Современный подход к банковскому обслуживанию
    </h2>
    <ul className="space-y-3 text-gray-700 md:text-[20px] sm:text-[16px] text-[12px]">
      <li className="flex items-start">
        <CheckCircle className="text-green-600 sm:w-5 w-4 sm:h-5 h-4 flex-shrink-0 mr-2 mt-1" />
        Удобные мобильные приложения для Android и iOS
      </li>
      <li className="flex items-start">
        <CheckCircle className="text-green-600 sm:w-5 w-4 sm:h-5 h-4 flex-shrink-0 mr-2 mt-1" />
        Интеллектуальные алгоритмы анализа трат
      </li>
      <li className="flex items-start">
        <CheckCircle className="text-green-600 sm:w-5 w-4 sm:h-5 h-4 flex-shrink-0 mr-2 mt-1" />
        Поддержка новых способов оплаты: Apple Pay, Google Pay
      </li>
      <li className="flex items-start">
        <CheckCircle className="text-green-600 sm:w-5 w-4 sm:h-5 h-4 flex-shrink-0 mr-2 mt-1" />
        Интеграция с государственными сервисами онлайн
      </li>
    </ul>
  </div>

  <div
  className="bg-cover bg-center h-[300px] md:h-auto overflow-hidden"
  >
  <div
    className="w-full h-full transition-all duration-800 ease-in-out hover:scale-105 bg-cover bg-center"
    style={{
      backgroundImage: "url('/zastavka_bank.png')"
    }}
  />
  </div>
</motion.div>

{/* Отзывы клиентов */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="bg-[var(--color-card)] p-6 sm:p-8 rounded-xl shadow max-sm:-mt-[20px]"
>
  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary)] mb-6 text-center">Отзывы клиентов</h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {[
      {
        name: 'Алексей К.',
        text: 'Очень доволен обслуживанием в БГБ Банке. Быстро оформили кредит, всё понятно и удобно.',
        rating: 5,
      },
      {
        name: 'Марина Л.',
        text: 'Отличный интернет-банк, пользуюсь каждый день. Поддержка всегда на связи.',
        rating: 4,
      },
      {
        name: 'Олег П.',
        text: 'Удобное приложение и хорошие ставки по вкладам. Рекомендую.',
        rating: 5,
      },
      {
        name: 'Ирина В.',
        text: 'Прекрасный сервис, индивидуальный подход и хорошие условия для бизнеса.',
        rating: 5,
      },
    ].map((review, i) => (
      <div key={i} className="dark:bg-[#ececec] p-4 rounded-xl shadow-sm flex flex-col justify-between h-full hover:scale-105
      hover:shadow-xl duration-300 transition-all">
        <p className="text-gray-700 mb-3 text-sm sm:text-base">&ldquo;{review.text}&rdquo;</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-semibold text-[var(--color-secondary)] text-[12px] sm:text-base">{review.name}</span>
          <div className="text-yellow-400 text-sm">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
          </div>
        </div>
      </div>
    ))}
  </div>
</motion.div>


{/* FAQ */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="bg-[var(--color-card)] p-8 rounded-xl shadow max-sm:-mt-[20px]"
>
  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary)] mb-6 text-center">
    Часто задаваемые вопросы
  </h2>
  <div className="space-y-4">
    {faqData.map((item, idx) => (
      <div key={idx} className="border-b pb-2">
        <button
          onClick={() => toggleFAQ(idx)}
          className="w-full text-left flex justify-between items-center text-[var(--color-secondary)] font-semibold text-sm sm:text-base"
        >
          <span>{item.q}</span>
          <span>{openIndex === idx ? '−' : '+'}</span>
        </button>

        <AnimatePresence initial={false}>
          {openIndex === idx && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2 text-gray-700 text-sm sm:text-base"
            >
              {item.a}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ))}
  </div>
</motion.div>

      {/* Контакты */}
      <div className="bg-[var(--color-card)] p-3 rounded-xl shadow text-center max-sm:-mt-[50px]">
        <h2 className="text-2xl max-sm:text-xl font-semibold text-[var(--color-secondary)] mb-2">Контакты</h2>
        <p className="text-gray-700 max-sm:text-[14px]">📍 г. Минск, ул. Интернациональная, 36</p>
        <p className="text-gray-700 max-sm:text-[12px]">📞 +375 (17) 218-99-01</p>
        <p className="text-gray-700 max-sm:text-[14px]">📧 info@bgb.by</p>
      </div>

    </section>
  )
}
