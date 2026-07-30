import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Dashboard({ setIsAuthenticated, isAuthenticated }) {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [renda, setRenda] = useState()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [userId, setUserId] = useState()

  async function handleLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    navigate("/")
  }

  async function getUser() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      setError("Erro ao exibir usuário")
      return;
    }
    setUsername(data.session.user.user_metadata?.username)
    setUserId(data.session.user.id)
  }


  async function adicionarRenda(e) {
    e.preventDefault()

    const { error: profileError } = await supabase.from("profiles").update({
      income: renda
    }) //atualizando o campo de renda
      .eq("id", userId) //onde o id é igual ao userId



    if (profileError) {
      setError("Erro ao atualizar o saldo")
      return
    }

    setMessage("Renda atualizada")

    const { data } = await supabase
      .from("profiles")
      .update({ income: renda })
      .eq("id", userId)
      .select()
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

          {username && <h3 className="text-white text-2xl m-4 font-bold">Bem vindo, {username}</h3>}

          <section className="flex justify-center items-center">
            <form
              onSubmit={adicionarRenda}
              className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md flex flex-col gap-4 border border-gray-100"
            >

              <div className="flex flex-col gap-1.5">

                <label htmlFor="income" className="text-sm font-semibold text-gray-700">
                  Renda Mensal
                </label>

                <input
                  onChange={(e) => {
                    setRenda(e.target.value)
                    setError("")
                  }}
                  type="text"
                  id="income"
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />


              </div>


              <p className="text-green-500"> {message} </p>
              <button
                type="submit" className="w-full mt-2 bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                Adicionar Renda Mensal
              </button>

            </form>
          </section>

          <button className="p-5 rounded-xl text-2xl bg-slate-700 hover:bg-slate-800 transition-colors font-sans font-bold mt-5 text-white" onClick={handleLogout}>
            Logout
          </button>

        </main>
      </div>
    </>
  );
}

export default Dashboard;
