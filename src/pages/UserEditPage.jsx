import { useState } from "react";
import MainLayout from "../components/MainLayout";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/useAuth";

function UserEditPage() {
  const [pfp, setPfp] = useState("");
  const [pfpFile, setPfpFile] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { user, refreshProfile } = useAuth();

  async function handleEdit(e) {
    e.preventDefault();
    setError("");

    if (confirmpassword !== password) {
      setError("A senha não é a mesma!");
      return;
    }

    try {
      //atualizando a senha no supabase
      if (password) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
      }

      //atualizando o usuário no supabase
      if (username) {

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .update({ name: username })
          .eq("id", user.id);


          console.log(profileError)
          console.log(profileData)

        const { data: authData, error: authError  } = await supabase.auth.updateUser({ //colocado para alterar o nome de usuário dentro do JSON do auth do supabase
          data: { 
            username: username,
            display_name: username,
            full_name: username
          },
        });

        console.log(authData)

        if ( authError) throw error;
      }

      if (pfp) {
        //fazendo o upload do arquivo
        const file = pfpFile; //guardando o arquivo

        // eslint-disable-next-line no-unused-vars
        const { data, error: uploadError } = await supabase.storage
          .from("pfp") //nome do bucket dentro do supabase
          .upload(`${user.id}/avatar`, file, { upsert: true });

        if (uploadError) throw uploadError;

        //pegando a ULR pública
        const {
          data: { publicUrl },
        } = supabase.storage.from("pfp").getPublicUrl(`${user.id}/avatar`);

        //salvando a url no banco do supabase
        const { error } = await supabase
          .from("profiles")
          .update({ pfp: publicUrl })
          .eq("id", user.id);

        if (error) throw error;
      }

      await refreshProfile(user.id);
      setMessage("Perfil Atualizado");
    } catch (err) {
      console.log(err);
      setError("Erro ao atualizar o perfil");
    }
  }

  return (
    <>
      <MainLayout title="Configuração do Usuário">
        <main className="flex justify-center items-center text-white">
          <div className="w-2xl mx-auto bg-slate-800 rounded-2xl border border-gray-50 overflow-hidden my-8">
            <form
              onSubmit={handleEdit}
              className="px-18 py-6 space-y-6 flex flex-col mb-8 text-white"
            >
              <span className="text-red-500">{error}</span>
              <span className="text-green-500">{message}</span>

              <h1 className="font-bold">Editar Perfil</h1>

              {pfp ? (
                <img src={pfp} alt="fotodeperfil" className="w-40 rounded-xl" />
              ) : (
                <h3>Carregue uma foto de perfil</h3>
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
                    setPfpFile(file);
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

              <button
                type="submit"
                className="max-w-2xl max-sm: bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
              >
                Atualizar Perfil
              </button>
            </form>
          </div>
        </main>
      </MainLayout>
    </>
  );
}

export default UserEditPage;
