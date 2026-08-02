import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    const result = await register(email, password, username)

    console.log(result);

    if (!result) {
      setError(result.message);
      return;
    }

      setEmail("");
      setUsername("");
      setPassword("");
      setMessage("Registration successful");
      navigate("/")
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Sign up to start managing your finances"
      linkTo="/"
      linkText="Already have an account? Log in now"
    >
      {error && <p className="mb-4 text-center text-sm font-medium text-red-500">{error}</p>}
      {message && <p className="mb-4 text-center text-sm font-medium text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Choose a username"
            type="text"
            id="username"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            type="email"
            id="email"
            placeholder="seu@email.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Create a password"
            type="password"
            id="password"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button className="mt-2 rounded-lg bg-slate-800 py-2.5 font-semibold text-white transition hover:bg-slate-700">
          Sign up
        </button>
      </form>
    </AuthCard>
  );
}

export default Register;
