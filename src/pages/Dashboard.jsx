import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Dashboard({ setIsAuthenticated,isAuthenticated}) {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [error,setError] = useState("")



  async function handleLogout() {
    await supabase.auth.signOut(); 
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    navigate("/")
  }

  async function getUser() {

    const {data, error} = await supabase.auth.getSession()

    console.log(data)
    
    if (error) {
      setError("Erro ao exibir usuário")
      return;
    }
    
    setUsername(data.session.user.user_metadata?.username)

    

  }


    useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    } else {
      getUser();
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="min-h-screen bg-slate-900">
        <main className="flex justify-center items-center flex-col">

          <h2 className="text-white text-2xl m-4">You're logged in</h2>

          {error && <p className="text-red-500 text-2xl m-4 font-bold">{error}</p>}

          {username && <h3 className="text-white text-2xl m-4 font-bold">{username}</h3>}

          <button className="p-5 rounded-xl text-2xl bg-slate-200 font-sans font-bold" onClick={handleLogout}>
            Logout
          </button>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
