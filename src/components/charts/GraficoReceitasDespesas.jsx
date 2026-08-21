import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const CORES = ["#05DF69", "#FF5F5B"]

function GraficoReceitasDespesas({ transactions }) {
  
  const receitas = transactions
    .filter(t => t.tipo.toLowerCase() === "receita")
    .reduce((total, t) => total + Number(t.valor), 0)

  const despesas = transactions
    .filter(t => t.tipo.toLowerCase() === "despesa")
    .reduce((total, t) => total + Number(t.valor), 0)

  const dados = [
    { name: "Receitas", value: receitas },
    { name: "Despesas", value: despesas },
  ]

  if (!dados.some(d => d.value > 0)) return null

  return (
    <div className="bg-slate-800 rounded-2xl p-6 min-w-[280px] flex-1">
      <h3 className="text-white text-xl font-bold mb-4">Receitas vs Despesas</h3>
      <PieChart width={300} height={300}>
        <Pie data={dados} cx={150} cy={150} innerRadius={60} outerRadius={100} dataKey="value">
          {dados.map((entry, index) => (
            <Cell key={index} fill={CORES[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`} />
        <Legend />
      </PieChart>
    </div>
  )
}

export default GraficoReceitasDespesas