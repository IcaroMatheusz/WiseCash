import { Home, FolderIcon, Settings, LogOut, X } from "lucide-react"


const menuItems = [
    { label: "Home", icon: Home },
    { label: "Categories", icon: FolderIcon },
    { label: "Settings", icon: Settings },
    { label: "Log out", icon: LogOut}
]

function SideBar({ isOpen, onClose }) {

    return (
        <>
            {isOpen && ( //renderizacao condicional, se isOpen for true ele mostra o div
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-30"
                />
            )}

            <aside className={`fixed top-0 left-0 z-40 h-full w-64 bg-slate-900 text-slate-200 
                flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <div className="flex items-center justify-between px-6 h-16 border-b border-slate-600">
                    <span className="text-lg font-semibold tracking-tight text-white">
                        WiseCash
                    </span>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                        aria-label="Fechar Menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1"> 
                    {menuItems.map(({ label, icon: Icon }) => (
                        <a
                            key={label}
                            href="#"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                            <Icon size={18} />
                            {label}
                        </a>
                    ))}
                </nav>
            </aside>

        </>
    )
}

export default SideBar;