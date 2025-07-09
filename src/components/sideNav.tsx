import Link from 'next/link'
export default function SideNav({ open, onClose }: { open: boolean, onClose: () => void }) {
    return (
        <div
        className={`fixed left-0 top-19 w-60 bg-[#ff1111]/80 shadow-lg transition-transform z-50
        h-[calc(100vh-64px)] ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/*<button className="ml-5 text-white text-2xl w-8 h-8 rounded-full bg-[#ff0000]/80 hover:scale-108 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer" onClick={onClose}>✕</button>*/}
        <nav className="flex flex-col p-4 space-y-3">
          <Link href="/" className="text-[20px] font-medium text-gray-800 hover:text-[#dfdfdf]
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">Главная</Link>
          <a href="/services" className="text-[20px] font-medium text-gray-800 hover:text-[#dfdfdf]
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">Конвертер валют</a>
          <a href="/about" className="text-[20px] font-medium text-gray-800 hover:text-[#dfdfdf] 
              transition-all duration-300 transform hover:rotate-1
              hover:translate-x-2 hover:scale-[1.02] hover:text-shadow-[0px_8px_8px_rgba(0,0,0,0.9)]">О банке</a>
        </nav>
      </div>
    )
  }
  