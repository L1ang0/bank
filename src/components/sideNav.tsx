export default function SideNav({ open, onClose }: { open: boolean, onClose: () => void }) {
    return (
        <div
        className={`fixed left-0 top-19 w-64 bg-white shadow-lg transition-transform z-50
        h-[calc(100vh-64px)] ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button className="p-4 text-xl" onClick={onClose}>✕</button>
        <nav className="flex flex-col p-4 space-y-2">
          <a href="/" className="hover:text-blue-600">Главная</a>
          <a href="/services" className="hover:text-blue-600">Конвертер валют</a>
          <a href="/about" className="hover:text-blue-600">О банке</a>
        </nav>
      </div>
    )
  }
  