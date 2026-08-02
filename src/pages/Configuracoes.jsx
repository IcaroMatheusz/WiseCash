import { Settings } from "lucide-react";
import HeaderBar from "../components/HeaderBar";

function Configuracoes() {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeaderBar />

      <section className="flex justify-center items-center">
        <header className="flex justify-center flex-row text-white text-5xl gap-6">
          <h1>Configurações </h1>
          <span>
            <Settings size={52}/>
          </span>
        </header>
      </section>
    </div>
  );
}

export default Configuracoes;
