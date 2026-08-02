import { supabase } from "../lib/supabase";

export async function addCategory({ nome, tipo, userId }) {
    
    const { data, error } = await supabase
        .from("categories")
        .insert([{ nome, tipo, user_id: userId }]) //inserindo os dados da categoria no insert
        .select()
    
    if (error) throw error

    return data
}

export async function getCategories(userId) {
    const { data, error } = await supabase //buscando todas as categorias
    .from("categories")
    .select("*") 
    .eq("user_id", userId)

    if (error) throw error

    return data
}