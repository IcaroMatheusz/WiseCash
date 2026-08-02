import { useState } from "react";
import SideBar from "./SideBar";
import { Menu, CircleUserIcon } from "lucide-react";
import { Link } from "react-router-dom";

function HeaderBar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="p-4 flex justify-between">

      <button onClick={() => setIsSidebarOpen(true)} className="text-white">
        <Menu size={30} />
      </button>

      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <Link to="#" className="text-white justify-end">
        <CircleUserIcon size={40} />
      </Link>
    </header>
  );
}

export default HeaderBar;
