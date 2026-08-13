import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import MainLayout from "../components/MainLayout";
import InfoCard from "../components/InfoCard";
import { getTransactions } from "../services/transactions";
import { useAuth } from "../context/useAuth";
import { WalletIcon, CircleArrowUpIcon, CircleArrowDownIcon } from "lucide-react";

function Dashboard() {
  const { user, profile } = useAuth();
  const [renda, setRenda] = useState();
  const [RendaSalva, setRendaSalva] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  async function getUser() {
    const { data, error } = await supabase.auth.getSession(); //guardando os dados de sessão

    if (error) {
      setError("Erro ao exibir usuário");
      return;
    }

    const id = data.session.user.id; //setando o username para ser o mesmo do objeto na api

    const { data: profile } = await supabase
      .from("profiles")
      .select("income")
      .eq("id", id)
      .single();

    if (profile) {
      setRendaSalva(profile.income);
    }
  }

  async function adicionarRenda(e) {
    e.preventDefault();

    const { data: sessionData } = await supabase.auth.getSession(); //pegando os dados de sessão
    const id = sessionData.session.user.id; //pegando o id de usuario da sessão

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        //atualizando o campo de renda
        income: renda,
      })
      .eq("id", id); //trocando pro id certo

    if (profileError) {
      setError("Erro ao atualizar o saldo");
      return;
    }

    setMessage("Renda atualizada");
    setRendaSalva(renda);
  }

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUser();
    },[]) 

  useEffect(() => {
    async function loadTransactions() {
      if (!user) return;
      const data = await getTransactions(user.id);
      setTransactions(data);
    }
    loadTransactions();
  }, [user]);

  const receitas = transactions
    .filter((transaction) => transaction.tipo.toLowerCase() === "receita")
    .reduce((total, transaction) => total + Number(transaction.valor), 0);
  const despesas = transactions
    .filter((transaction) => transaction.tipo.toLowerCase() === "despesa")
    .reduce((total, transaction) => total + Number(transaction.valor), 0);
  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const saldoAtual = (Number(profile?.income || 0 ) + receitas - despesas)

  return (
    <>
      <MainLayout title='Dashboard'>

        <main className="flex justify-center items-center mt-9 flex-col">

          <section className="flex flex-wrap justify-center gap-5 mb-9">
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
          </section>

          <section className="flex justify-center items-center">
            <form
              onSubmit={adicionarRenda}
              className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md flex items-center flex-col gap-4 border border-gray-100"
            >
              <div className="flex flex-col gap-1.5">
                <p className="text-red-500 text-2xl font-bold">{error}</p>

                <label
                  htmlFor="income"
                  className="text-sm font-semibold text-gray-700"
                >
                  Adicionar Renda Mensal
                </label>

                <input
                  onChange={(e) => {
                    setRenda(e.target.value);
                    setError("");
                  }}
                  type="text"
                  id="income"
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {RendaSalva && (
                <p className="text-slate-800 text-lg">
                  Renda mensal: R$ {RendaSalva}
                </p>
              )}

              <p className="text-green-500"> {message} </p>
              <button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
              >
                Adicionar Renda Mensal
              </button>
            </form>
          </section>
        </main>
      </MainLayout>
    </>
  );
}

export default Dashboard;
