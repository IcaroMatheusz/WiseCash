import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { getCategories } from "../../services/categories"
import { useState, useEffect } from "react"

function GraficoReceitasPorCategoria({ transactions, userId }) {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    async function load() {
      if (!userId) return
      const data = await getCategories(userId)
      setCategorias(data)
    }
    load()
  }, [userId])

  const dados = categorias
    .map((cat) => {
      const total = transactions
        .filter(t => t.category_id === cat.id && t.tipo.toLowerCase() === "receita")
        .reduce((sum, t) => sum + Number(t.valor), 0)

      return { name: cat.nome, valor: total }
    })
    .filter(d => d.valor > 0)

  if (dados.length === 0) return null

  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <h3 className="text-white text-xl font-bold mb-4">Receitas por Categoria</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`} />
          <Bar dataKey="valor" fill="#4ade80" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoReceitasPorCategoria