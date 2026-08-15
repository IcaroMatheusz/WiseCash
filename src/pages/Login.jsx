import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Eye, EyeOff } from "lucide-react"
import AuthCard from "../components/AuthCard";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("")
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.success) navigate("/dashboard");
  }

  return (
    <AuthCard
      title="Entrar na conta"
      subtitle="Acesse sua conta para continuar"
      linkTo="/register"
      linkText="Não tem uma conta? Registre-se"
    >
      {error && (
        <p className="mb-4 text-center text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Insira o email"
            type="email"
            id="email"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Insira a senha"
            type="password"
            id="password"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />


        </div>

        <button className="mt-2 rounded-lg bg-slate-800 py-2.5 font-semibold text-white transition hover:bg-slate-700">
          Entrar
        </button>
      </form>
    </AuthCard>
  );
}

export default Login;
