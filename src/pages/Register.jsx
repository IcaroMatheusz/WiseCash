import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message,setMessage] = useState("")

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || (email === "") || (password === "")) {
      setError("Preencha todos os campos");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ //usando a função de registro do Supabase
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          full_name: username, //esse campo full_name vai adicionar o nome no Display Name do Supabase
        }
      }
    });

    if (error) {  //caso ocorra algum erro, vai rodar essa funcao e interromper o fluxo
      
      setError("Ocorreu um problema no registro");
      return;

    } else if (data?.user) {  //caso nao ocorra, ele limpa os campos e exibe uma mensagem de sucesso
      
      const { error: profileError } = await supabase.from("profiles").insert({ //antes de confirmarmos o login, vamos tentar adicioná-lo na tabela profiles
        id: data.user.id, //botando o id da auth do supabase dentro do campo id da tabela
        name: username //botando o nome dentro do username dentro do campo name
      });

      if (profileError) { //caso tenha ocorrido algum erro ao inserir os dados na tabela profile
        setError("Conta criada, mas houve um erro ao salvar o perfil")
        return;
      }

      setEmail("")
      setUsername("")
      setPassword("")
      setMessage("Registro realizado com sucesso")

    }

    console.log(data.user.email);
    navigate("/");
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
          <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg mb-10">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
              Register
            </h2>

            <p className="text-red-500 text-sm text-center">{error}</p>

            <p className="text-green-500 text-sm text-center">{message}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label
                htmlFor="username"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Username:
              </label>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value); //salvando o valor do usuario dentro da variavel username
                  setError("");
                }}
                placeholder="Create a username"
                type="text"
                id="username"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />

              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value); //salvando o valor do email dentro da variavel email
                  setError("");
                }}
                type="email"
                id="email"
                placeholder="johndoe@gmail.com"
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
                  setPassword(e.target.value); //salvando o valor do password dentro da variavel password
                  setError("");
                }}
                placeholder="Create a password"
                type="password"
                id="password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />

              <Link to="/" className="text-slate-700">
                Já possui uma conta?
              </Link>

              <button className="mt-4 rounded-lg bg-slate-800 py-2 font-semibold text-white transition hover:bg-slate-700">
                Sign up
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Register;
