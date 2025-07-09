'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function MainContent() {
  return (
    <section className="space-y-16">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center shadow-lg"
      >
        <div className="space-y-4 md:w-1/2">
          <h1 className="text-4xl font-bold leading-snug">
            БГБ Банк — Ваш финансовый партнёр
          </h1>
          <p className="text-lg text-blue-100">
            Современные банковские решения для жизни и бизнеса.<br/><span className="text-[#ffffff] font-light text-[24px] underline decoration-3 underline-offset-6 decoration-White"> Быстро. Надёжно. Онлайн</span>.
          </p>
          <button className="mt-4 px-6 py-2 bg-white text-blue-800 font-semibold rounded-lg hover:bg-red-100 hover:rotate-1 hover:scale-102 transition-all cursor-pointer duration-400 transform">
            Подробнее о нас
          </button>
        </div>
        <motion.img
    src="/logo.png"
    alt="Bank Logo"
    className="h-65 w-140"
    initial={{ 
      filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.4))",
      rotate: 0
    }}
    whileHover={{
      
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
  />
      </motion.div>

      {/* Услуги банка */}
      <div>
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Наши продукты</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Депозиты', desc: 'Ставки до 12% годовых. Гибкие сроки и условия.', icon: '💰' },
            { title: 'Кредиты', desc: 'Потребительские, ипотека, бизнес. Быстрое одобрение.', icon: '🏠' },
            { title: 'Интернет-банк', desc: 'Полный контроль над финансами 24/7.', icon: '📱' },
          ].map((item, i) => (
            
            <motion.div
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

  className="bg-white p-6 rounded-xl shadow hover:shadow-xl"
>
  <div className="text-4xl mb-2">{item.icon}</div>
  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
  <p className="text-gray-600">{item.desc}</p>
</motion.div>
          ))}
        </div>
      </div>

      {/* Преимущества */}
      <div className="bg-blue-50 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Почему выбирают нас</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            '20+ лет на рынке',
            'Надёжная система безопасности',
            'Быстрое обслуживание клиентов',
            'Поддержка онлайн 24/7',
            'Широкая сеть банкоматов',
            'Индивидуальный подход к каждому',
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <CheckCircle className="text-blue-600 mt-1" />
              <span className="text-gray-700 font-bold">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* О банке */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative rounded-xl overflow-hidden text-white"
      >

        <div className="relative p-10 bg-gradient-to-r from-red-600 to-red-500 bg-opacity-70">
          <h2 className="text-3xl font-bold mb-4">О БГБ Банке</h2>
          <p className="text-lg max-w-3xl">
            Мы — современный, надёжный банк, который помогает миллионам белорусов решать финансовые задачи. Наши решения — это доверие, безопасность и инновации. БГБ Банк входит в список крупнейших банков страны и активно развивается в цифровой среде.
          </p>
        </div>
      </motion.div>

      {/* Контакты */}
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">Контакты</h2>
        <p className="text-gray-700">📍 г. Минск, ул. Интернациональная, 36</p>
        <p className="text-gray-700">📞 +375 (17) 218-99-01</p>
        <p className="text-gray-700">📧 info@bgb.by</p>
      </div>

    </section>
  )
}
