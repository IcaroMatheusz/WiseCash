import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ setIsAuthenticated,isAuthenticated}) {

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])

  function handleLogout() {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    navigate("/")
  }

  return (
    <>
      <div className="min-h-screen bg-slate-900">
        <main className="flex justify-center items-center">
          <h2 className="text-white text-2xl m-4">You're logged in</h2>

          <button className="p-12px bg-slate-300 font-sans font-bold" onClick={handleLogout}>
            Logout
          </button>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
