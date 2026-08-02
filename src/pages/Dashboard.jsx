import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { Menu, CircleUserIcon/* , LogOutIcon */ } from "lucide-react";
import SideBar  from '../components/SideBar'

function Dashboard({ /* setIsAuthenticated, */ isAuthenticated }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [renda, setRenda] = useState();
  const [RendaSalva, setRendaSalva] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
/*   async function handleLogout() {
    //função para lidar com o logout
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  } */

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  async function getUser() {
    const { data, error } = await supabase.auth.getSession(); //guardando os dados de sessão

    if (error) {
      setError("Erro ao exibir usuário");
      return;
    }

    const id = data.session.user.id;
    setUsername(data.session.user.user_metadata?.username); //setando o username para ser o mesmo do objeto na api

    const { data: profile } = await supabase
      .from("profiles")
      .select("income")
      .eq("id", id)
      .single();

    if (profile) {
      setRendaSalva(profile.income);
    }
  }

  async function adicionarRenda(e) {
    e.preventDefault();

    const { data: sessionData } = await supabase.auth.getSession(); //pegando os dados de sessão
    const id = sessionData.session.user.id; //pegando o id de usuario da sessão

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        //atualizando o campo de renda
        income: renda,
      })
      .eq("id", id); //trocando pro id certo

    if (profileError) {
      setError("Erro ao atualizar o saldo");
      return;
    }

    setMessage("Renda atualizada");
    setRendaSalva(renda);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <div className="min-h-screen bg-slate-900">
        <header className="p-4 flex justify-between">

          
{/*           <button className="text-white" onClick={handleLogout}>
            <LogOutIcon size={30}/>
          </button> */}

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white"
        >
          <Menu size={30}/>
        </button>

        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

          <Link to="#" className="text-white justify-end">
            <CircleUserIcon size={40} />
          </Link>
        </header>

        <main className="flex justify-center items-center flex-col">
          <h3 className="text-white text-2xl m-4 font-bold">
            Bem vindo, {username}
          </h3>

          <section className="flex justify-center items-center">
            <form
              onSubmit={adicionarRenda}
              className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md flex items-center flex-col gap-4 border border-gray-100"
            >
              <div className="flex flex-col gap-1.5">
                <p className="text-red-500 text-2xl font-bold">{error}</p>

                <label
                  htmlFor="income"
                  className="text-sm font-semibold text-gray-700"
                >
                  Renda Mensal
                </label>

                <input
                  onChange={(e) => {
                    setRenda(e.target.value);
                    setError("");
                  }}
                  type="text"
                  id="income"
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {RendaSalva && (
                <p className="text-slate-800 text-lg">
                  Renda mensal: R$ {RendaSalva}
                </p>
              )}

              <p className="text-green-500"> {message} </p>
              <button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
              >
                Adicionar Renda Mensal
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
