import { CircleArrowUpIcon, CircleArrowDownIcon, WalletIcon} from "lucide-react";
import HeaderBar from "../components/HeaderBar";

function Extrato() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeaderBar />
      <section className="flex justify-center items-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl text-center">Extrato</h1>
      </section>
      <main className="flex flex-wrap justify-center gap-5 mt-9 px-4">
        <div className="w-full max-w-sm sm:w-80 lg:w-85 p-9 bg-slate-800 text-2xl text-slate-100 rounded-2xl">
          <div className="flex flex-row justify-between ">
            <p>Saldo Atual</p>
            <WalletIcon size={38} />
          </div>
          <p className="text-slate-100 font-bold">R$ 1000</p>
        </div>

        <div className="w-full max-w-sm sm:w-80 lg:w-85 p-9 bg-slate-800 text-2xl text-slate-100 rounded-2xl">
          <div className="flex flex-row justify-between">
            <p>Receitas</p>
            <CircleArrowUpIcon size={38} className="text-green-400" />
          </div>
          <p className="text-green-400 font-bold">R$ 1000</p>
        </div>

        <div className="w-full max-w-sm sm:w-80 lg:w-85 p-9 bg-slate-800 text-2xl text-slate-100 rounded-2xl">
          <div className="flex flex-row justify-between ">
            <p>Despesas</p>
            <CircleArrowDownIcon size={38} className="text-red-400" />
          </div>
          <p className=" text-red-400 font-bold">R$ 1000</p>
        </div>
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

              <select className="w-full border rounded-lg p-3">
                <option>Academia</option>
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
