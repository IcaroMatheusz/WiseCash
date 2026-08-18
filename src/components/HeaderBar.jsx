import { useState } from "react";
import SideBar from "./SideBar";
import { Menu, CircleUserIcon } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

function HeaderBar({ title }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, profile } = useAuth();

  if (!user) return null;

  return (
    <header className="grid grid-cols-3 items-center gap-2 p-4">
      <div className="justify-self-start">
        <button onClick={() => setIsSidebarOpen(true)} className="text-white">
          <Menu size={30} />
        </button>

        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <h1 className="justify-self-center text-2xl sm:text-4xl text-white truncate">{title}</h1>

      <Link
        to="/useredit"
        className="justify-self-end flex items-center gap-2 text-white min-w-0"
      >
        <span className="hidden sm:inline text-slate-300 text-2xl truncate max-w-[10rem]">
          {user.user_metadata?.username}
        </span>

        {profile?.pfp ? (
          <img
            // eslint-disable-next-line react-hooks/purity
            src={`${profile.pfp}?t=${Date.now()}`}
            alt="foto de perfil"
            className="w-10 h-10 sm:w-15 sm:h-15 rounded-full object-cover shrink-0"
          />
        ) : (
          <CircleUserIcon size={40} className="shrink-0" />
        )}
      </Link>
    </header>
  );
}

export default HeaderBar;
