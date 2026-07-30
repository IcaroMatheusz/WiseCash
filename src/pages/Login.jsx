import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase"

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); //cancela o carregamento da página, porque no HTML antigo
    //o formulario recarrega a página toda vez q é apertado um botão
    //preventdefault previni o comportamento padrão, bem intuitivo

    if (email === "" || password === "") { //validacao para verificar se os campos estao vazios
      setError("Preencha todos os campos"); 
      return
    }

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.auth.signInWithPassword({ //constante para esperar a resposta do supabase
      email: email, //para utilizar o email, ele está pegando a variável email
      password: password, //para utilizar a senha, ele está pegando a variável password
    })

    if (error) {
      setError("Usuário ou senha inválidos")
      return
    }

    localStorage.setItem("isAuthenticated","true")
    setIsAuthenticated(true);

    navigate("/dashboard");
  }

  return (
    <>
      <div className="min-h-screen bg-slate-800 font-sans">
        <header className="py-10 text-center">
          <h1 className="text-5xl font-bold text-white">Finance Management</h1>

          <p className="mt-3 text-xl text-slate-300">
            Helping you to use optimize your money!
          </p>
        </header>

        <main className="flex justify-center items-center">
          <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
              Login
            </h2>

            <p className="text-red-500 text-sm text-center">{error}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");}}
                placeholder="Digite seu email"
                type="text"
                id="email"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />

              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Password:
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Digite sua senha"
                type="password"
                id="password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />

              <Link to="/register" className="text-slate-700">
                Não possui uma conta?
              </Link>

              <button className="mt-4 rounded-lg bg-slate-800 py-2 font-semibold text-white transition hover:bg-slate-700">
                Sign in
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
