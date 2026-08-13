import { useState } from "react";
import MainLayout from "../components/MainLayout";

function UserEditPage() {
  const [pfp, setPfp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleEdit(e) {
    e.preventDefault();

    setError("");

    if (confirmpassword !== password) {
      setError("A senha não é a mesma!");
      return;
    }
  }

  return (
    <>
      <MainLayout title="Configuração do Usuário">
        <main className="flex justify-center items-center text-white">
          <div className="w-2xl mx-auto bg-slate-800 rounded-2xl border border-gray-50 overflow-hhtmlForden my-8">
            <form
              onSubmit={handleEdit}
              className="px-18 py-6 space-y-6 flex flex-col mb-8 text-white"
            >
              <span className="text-red-500">{error}</span>

              <h1 className="font-bold">Editar Perfil</h1>

              {pfp ? (
                <img src={pfp} alt="fotodeperfil" className="w-40 rounded-xl" />
              ) : (
                <h3>Sem foto de Perfil</h3>
              )}

              <label //PREVIEW DA PFP
                htmlFor="profile-picture"
                className="block w-40 border text-center text-gray-400 border-slate-500 rounded-lg p-3 cursor-pointer hover:bg-slate-700 transition"
              >
                Escolher arquivo
              </label>

              <input 
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setPfp(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />

              <label htmlFor="username" className="">
                Nome de Usuário:
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder="Digite seu nome de usuário"
                className="w-full border border-slate-500 rounded-lg p-3"
              />

              <label htmlFor="password">Nova Senha:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Digite sua nova senha"
                className="w-full border border-slate-500 rounded-lg p-3"
              />

              <label htmlFor="confirmar-senha">Confirmar Senha:</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmar-senha"
                placeholder="Digite sua nova senha"
                className="w-full border border-slate-500 rounded-lg p-3"
              />
            </form>
          </div>
        </main>
      </MainLayout>
    </>
  );
}

export default UserEditPage;
