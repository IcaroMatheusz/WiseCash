import {
  CircleArrowUpIcon,
  CircleArrowDownIcon,
  WalletIcon,
} from "lucide-react";
import HeaderBar from "../components/HeaderBar";
import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import { getTransactions } from "../services/transactions";
import { getCategories } from "../services/categories";
import { useAuth } from "../context/useAuth";

function Extrato() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [transactions, setTransacations] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { user, loading } = useAuth();

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      const cats = await getCategories(user.id);
      setCategorias(cats);
      const trans = await getTransactions(user.id);
      setTransacations(trans);
    }
    loadData();
  }, [user]);

  if (loading) return <p className="text-white">Carregando...</p>;

  return (
    <div className="min-h-screen bg-slate-900">
      <HeaderBar title="Extrato" />

      <main className="flex flex-wrap justify-center gap-5 mt-9 px-4">
        <InfoCard title="Saldo Atual" value="R$1.000" icon={WalletIcon} />

        <InfoCard
          title="Receitas"
          value="R$ 1.000"
          icon={CircleArrowUpIcon}
          valueColor="text-green-400"
          iconColor="text-green-400"
        />

        <InfoCard
          title="Despesas"
          value="R$ 1.000"
          icon={CircleArrowDownIcon}
          valueColor="text-red-400"
          iconColor="text-red-400"
        />
      </main>

      <div className="flex justify-center mt-8 px-4 pb-10">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Nova Transação
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Tipo
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                <label className="flex items-center gap-2">
                  <input type="radio" name="tipo" />
                  Receita
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="tipo" />
                  Despesa
                </label>
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Categoria
              </label>

              <select
                className="w-full border rounded-lg p-3"
                onChange={(e) => {
                  const cat = categorias.find((c) => c.id === e.target.value);
                  setCategoryId(e.target.value);
                  setTipo(cat.tipo); //preenchendo o tipo automaticamente
                }}
              >
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome} - {cat.tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Valor
              </label>

              <input
                type="text"
                placeholder="R$ 0,00"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Descrição
              </label>

              <input
                type="text"
                placeholder="Descrição"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Data
              </label>

              <input type="date" className="w-full border rounded-lg p-3" />
            </div>

            <div className="col-span-12 flex justify-center mt-2">
              <button className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-12 py-3 rounded-xl font-semibold transition">
                Adicionar Transação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Extrato;
