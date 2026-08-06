import { useState } from "react";
import SideBar from "./SideBar";
import { Menu, CircleUserIcon } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

function HeaderBar({ title }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useAuth();

  return (
    <header className="grid grid-cols-3 items-center p-4">
      <div className="justify-self-start">
        <button onClick={() => setIsSidebarOpen(true)} className="text-white">
          <Menu size={30} />
        </button>

        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <h1 className="justify-self-center text-4xl text-white">{title}</h1>

      <Link
        to="#"
        className="justify-self-end flex items-center gap-2 text-white"
      >
        <span className="text-slate-300 text-2xl">
          {user.user_metadata?.username}
        </span>
        <CircleUserIcon size={40} />
      </Link>
    </header>
  );
}

export default HeaderBar;
