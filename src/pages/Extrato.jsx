import { CircleArrowUpIcon,CircleArrowDownIcon, WalletIcon } from "lucide-react";
import HeaderBar from "../components/HeaderBar";

function Extrato() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeaderBar />
      <section className="flex justify-center items-center">
        <h1 className="text-white text-5xl">Extrato</h1>
      </section>
      <main className="flex justify-center items-center flex-row gap-5 mt-9">

        <div className="w-85 p-9 bg-slate-800 text-2xl text-slate-100 rounded-2xl">
          <div className="flex flex-row justify-between ">
            <p>Saldo Atual</p>
            <WalletIcon size={38} />
          </div>
          <p className="text-slate-100 font-bold">R$ 1000</p>
        </div>


        <div className="w-85 p-9 bg-slate-800 text-2xl text-slate-200 rounded-2xl">
          <div className="flex flex-row justify-between">
            <p>Receitas</p>
            <CircleArrowUpIcon size={38} className="text-green-400"/>
          </div>
          <p className="text-green-400 font-bold">R$ 1000</p>
        </div>

        <div className="w-85 p-9 bg-slate-800 text-2xl text-slate-200 rounded-2xl">
          <div className="flex flex-row justify-between ">
            <p>Despesas</p>
            <CircleArrowDownIcon size={38} className="text-red-400" />
          </div>
          <p className=" text-red-400 font-bold">R$ 1000</p>
        </div>
      </main>
    </div>
  );
}

export default Extrato;
