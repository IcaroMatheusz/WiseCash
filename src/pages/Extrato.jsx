import {
  CircleArrowUpIcon,
  CircleArrowDownIcon,
  WalletIcon,
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import { addTransaction, getTransactions } from "../services/transactions";
import { getCategories } from "../services/categories";
import { useAuth } from "../context/useAuth";

function Extrato() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { user, loading, profile } = useAuth(); 

  

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      const cats = await getCategories(user.id);
      setCategorias(cats);
      const trans = await getTransactions(user.id);
      setTransactions(trans);
    }
    loadData();
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!user || !descricao || !valor || !tipo || !data || !categoryId) {
      setError("Preencha todos os campos da transação.");
      return;
    }

    try {
      await addTransaction({
        descricao,
        valor: Number(valor.replace(",", ".")),
        tipo,
        data,
        category_id: categoryId,
        userId: user.id,
      });

      const updatedTransactions = await getTransactions(user.id);
      setTransactions(updatedTransactions);
      setDescricao("");
      setValor("");
      setData("");
      setCategoryId("");
      setTipo("");
      setMessage("Transação adicionada com sucesso.");
    } catch (transactionError) {
      setError(transactionError.message || "Não foi possível adicionar a transação.");
    }
  }

  const receitas = transactions
    .filter((transaction) => transaction.tipo.toLowerCase() === "receita")
    .reduce((total, transaction) => total + Number(transaction.valor), 0);
  const despesas = transactions
    .filter((transaction) => transaction.tipo.toLowerCase() === "despesa")
    .reduce((total, transaction) => total + Number(transaction.valor), 0);
  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const saldoAtual = (Number(profile?.income || 0 ) + receitas - despesas)

  if (loading) return <p className="text-white">Carregando...</p>;

  return (
    <MainLayout title="Extrato">

      <main className="flex flex-wrap justify-center gap-5 mt-9 px-4">
        <InfoCard
          title="Saldo Atual"
          value={formatCurrency(saldoAtual)}
          icon={WalletIcon}
        />

        <InfoCard
          title="Receitas"
          value={formatCurrency(receitas)}
          icon={CircleArrowUpIcon}
          valueColor="text-green-400"
          iconColor="text-green-400"
        />

        <InfoCard
          title="Despesas"
          value={formatCurrency(despesas)}
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

          <form className="grid grid-cols-1 md:grid-cols-12 gap-5" onSubmit={handleSubmit}>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Tipo
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tipo"
                    value="Receita"
                    checked={tipo === "Receita"}
                    onChange={(event) => setTipo(event.target.value)}
                  />
                  Receita
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tipo"
                    value="Despesa"
                    checked={tipo === "Despesa"}
                    onChange={(event) => setTipo(event.target.value)}
                  />
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
                value={categoryId}
                onChange={(e) => {
                  const cat = categorias.find((c) => c.id === e.target.value);
                  setCategoryId(e.target.value);
                  if (cat) setTipo(cat.tipo);
                }}
              >
                <option value="">Selecione uma categoria</option>
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
                value={valor}
                onChange={(event) => setValor(event.target.value)}
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
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
              />
            </div>

            <div className="md:col-span-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Data
              </label>

              <input
                type="date"
                className="w-full border rounded-lg p-3"
                value={data}
                onChange={(event) => setData(event.target.value)}
              />
            </div>

            <div className="col-span-12 flex justify-center mt-2">
              <button className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-12 py-3 rounded-xl font-semibold transition">
                Adicionar Transação
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-red-600">{error}</p>}
          {message && <p className="mt-4 text-green-600">{message}</p>}

          <section className="mt-8 overflow-x-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Transações</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500">Nenhuma transação cadastrada.</p>
            ) : (
              <table className="w-full text-left text-slate-700">
                <thead>
                  <tr className="border-b text-sm text-gray-500">
                    <th className="p-3">Data</th>
                    <th className="p-3">Descrição</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    const categoria = categorias.find((cat) => cat.id === transaction.category_id);
                    return (
                      <tr key={transaction.id} className="border-b last:border-0">
                        <td className="p-3">{transaction.data}</td>
                        <td className="p-3">{transaction.descricao}</td>
                        <td className="p-3">{categoria ? categoria.nome : "-"}</td>
                        <td className="p-3">{transaction.tipo}</td>
                        <td className="p-3">{formatCurrency(Number(transaction.valor))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default Extrato;
