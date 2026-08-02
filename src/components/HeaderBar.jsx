import { useState } from "react";
import SideBar from "./SideBar";
import { Menu, CircleUserIcon } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

function HeaderBar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useAuth()

  return (
    <header className="p-4 flex justify-between flex-row">

      <button onClick={() => setIsSidebarOpen(true)} className="text-white">
        <Menu size={30} />
      </button>

      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    
    
      <Link to="#" className="flex gap-1.5 text-white">
        <h1 className="text-slate-300 text-2xl">{user.user_metadata?.username}</h1>
        <CircleUserIcon size={40} />
      </Link>
    </header>
  );
}

export default HeaderBar;
