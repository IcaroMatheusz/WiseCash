import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

            <form action="submit" className="flex flex-col gap-4">
              <label
                htmlFor="username"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Username:
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)} //salvando o valor do usuario dentro da variavel username
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                type="password"
                id="password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />

              <Link to="/" className="text-slate-700">
                Já possui uma conta?
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

export default Register;
