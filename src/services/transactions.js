import { supabase } from "../lib/supabase";

export async function addTransaction({ descricao, valor, tipo, data, category_id, userId }) {
  const { data: result, error } = await supabase
    .from("transactions")
    .insert([{ descricao, valor, tipo, data, category_id, user_id: userId }])
    .select()

  if (error) throw error

  return result
}

export async function getTransactions(userId) {
    const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id",userId)

    if (error) throw error

    return data
}