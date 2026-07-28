import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard({ isAuthenticated}) {

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="min-h-screen bg-slate-900">
        <main className="flex justify-center items-center">
          <h2 className="text-white text-2xl m-4">You're logged in</h2>

          <Link to="/" className="p-12 bg-slate-400 text-slate-700">
            Logout
          </Link>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
