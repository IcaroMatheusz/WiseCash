import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth"
import AuthCard from "../components/AuthCard";

function Login() {

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Fill in all fields");
      return;
    }

    const result = await login(email, password)

    if (!result) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <AuthCard
      title="Enter your account"
      subtitle="Access your account to continue"
      linkTo="/register"
      linkText="Don't have an account? Sign up"
    >
      {error && <p className="mb-4 text-center text-sm font-medium text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder="Enter your email"
            type="email"
            id="email"
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
            placeholder="Enter your password"
            type="password"
            id="password"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button className="mt-2 rounded-lg bg-slate-800 py-2.5 font-semibold text-white transition hover:bg-slate-700">
          Enter
        </button>
      </form>
    </AuthCard>
  );
}

export default Login;
