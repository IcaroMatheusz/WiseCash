import { useEffect, useState } from "react";
import { addCategory, getCategories } from "../services/categories";
import { useAuth } from "../context/useAuth";
import HeaderBar from "../components/HeaderBar";

function Categorias() {
  const { user, loading } = useAuth();

  const [error, setError] = useState();
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [message, setMessage] = useState("");
  const [tipo, setTipo] = useState("despesa");

  useEffect(() => {
    async function loadCategories() {
      if (!user) return;
      const data = await getCategories(user.id);
      setCategorias(data);
    }
    loadCategories();
  }, [user]);

  async function addCategories(e) {
    e.preventDefault();

    console.log("user:", user);
    console.log("categoria:", categoria);
    console.log("tipo:", tipo);

    if (!user) {
      setError("Usuário não autenticado");
      return;
    }

    try {
      await addCategory({ nome: categoria, tipo, userId: user.id });
      setCategorias([...categorias, { nome: categoria, tipo }]);
      setMessage("Categoria adicionada com sucesso");
    } catch (err) {
      console.log(err);
      setError("Erro ao adicionar categoria");
    }
  }

  if (loading) return <p className="text-white">Carregando...</p>;

  return (
    <div className="min-h-screen bg-slate-900">
      <HeaderBar />

      <section className="flex justify-center items-center flex-col">
        <h1 className="text-white text-5xl p-4">Categorias</h1>

        <main className="flex juystify-center items-center flex-col gap-5">
          <p className="text-red-500">{error}</p>
          <p className="text-green-500">{message}</p>

          <form
            onSubmit={addCategories}
            className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md flex items-center flex-col gap-4 border border-gray-100"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="income"
                className="text-center font-semibold text-gray-700"
              >
                Adicionar Categoria
              </label>

              <input
                onChange={(e) => {
                  setCategoria(e.target.value);
                  setError("");
                }}
                type="text"
                id="income"
                placeholder="Delivery, Uber, FII..."
                className="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />

              <div className="flex flex-row gap-5">
                <label
                  htmlFor="receita"
                  className="text-center font-semibold text-gray-700"
                >
                  Receita
                </label>

                <input
                  type="radio"
                  name="tipo"
                  id="receita"
                  value="receita"
                  onChange={(e) => setTipo(e.target.value)}
                />

                <label
                  htmlFor="tipo"
                  className="text-center font-semibold text-gray-700"
                >
                  Despesa
                </label>

                <input
                  type="radio"
                  name="tipo"
                  id="despesa"
                  value="despesa"
                  onChange={(e) => setTipo(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
              >
                Adicionar Categoria
              </button>
            </div>
          </form>

          { categorias.length > 0 ? (
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 rounded-2xl">
              <thead className="bg-gray-50 rounded-2xl">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900 rounded-2xl">Nome</th>
                  <th className="px-6 py-4 font-medium text-gray-900 rounded-2xl">Tipo</th>
                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100 border-t border-gray-100 rounded-2xl">
                {categorias.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{cat.nome}</td>
                    <td className="px-6 py-4">{cat.tipo}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          ) : (
            <p className="text-slate-400">Sem categorias ainda...</p>
          )}
        </main>
      </section>
    </div>
  );
}

export default Categorias;
