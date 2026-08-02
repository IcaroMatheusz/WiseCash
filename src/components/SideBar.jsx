import { Home, FolderIcon, Receipt, Settings, LogOut, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function SideBar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const itemClass = "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer";

  const menuItems = [
    { label: "Início", icon: Home, path: "/dashboard" },
    { label: "Extrato", icon: Receipt, path: "/extrato" },
    { label: "Categorias", icon: FolderIcon, path: "/categorias" },
    { label: "Configurações", icon: Settings, path: "/configuracoes" },
    { label: "Log out", icon: LogOut, action: handleLogout },
  ];

  return (
    <>
      {isOpen && ( //renderizacao condicional, se isOpen for true ele mostra o div
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-30" />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-slate-900 text-slate-200 
                flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
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
          {menuItems.map(({ label, icon: Icon, path, action }) =>
            action ? (
              <button key={label} onClick={action} className={itemClass}>
                <Icon />
                {label}
              </button>
            ) : (
              <Link key={label} to={path} onClick={onClose} className={itemClass}>
                <Icon />
                {label}
              </Link>
            ),
          )}
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
