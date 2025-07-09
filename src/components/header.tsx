import Link from 'next/link'
export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
            <header className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-400  text-white px-6 py-1 shadow">
                <div className="flex items-center space-x-1">
                <button onClick={onMenuClick} className="text-white text-2xl w-10 h-10 rounded-full bg-red-300 hover:scale-108 transition-all duration-300 cursor-pointer">
                  &#9776;
                </button>
                    <img src="/logo.png" alt="Bank Logo" className="h-17 w-35 -ml-5" />
                    <Link href="/" className="-ml-2 text-2xl font-bold text-white hover:text-red-200 transition-colors duration-300 cursor-pointer">БГБ Банк</Link>
                    <Link href="/" className="ml-275 hover:text-red-200 transition-all duration-300 cursor-pointer">Вход в аккаунт</Link>
                </div>
            </header>
    )
  }
  