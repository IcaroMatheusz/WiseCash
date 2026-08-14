import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

//USANDO CONTEXTAPI PRA LIDAR COM A AUTENTICACAO (LOGOUT, REGISTRO E LOGIN)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //salvando o usuario
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const isAuthenticated = !!user //removido a autenticação com useState, agora se tiver usuário, user vira true, se não tiver, ele fica null

  async function login(email, password) { //LOGIN
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    //buscando o perfil do usuario que acabou de logar
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    setProfile(profile);
    setUser(data.user);
    return { success: true, message: "Usuário logado!" };
  }

  
  async function register(email, password, username) { //REGISTER
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: username,
        },
      },
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const { error: profileError } = await supabase.from("profiles").insert({ //ADICIONADO O USERNAME ASSIM QUE LOGA
      id: data.user.id,
      name: username,
    });

    if (profileError) {
      return {
        success: false,
        message: "Conta criada, mas houve um erro ao salvar o usuário",
      };
    }

    return {
      success: true,
      message: "Conta criada com sucesso",
    };
  }

  async function logout() { //LOGOUT
    await supabase.auth.signOut();
  }

  async function refreshProfile(userId) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  }

  useEffect(() => { //Foi substituído o LoadUser anterior pelo onAuthStateChange, pra evitar bugs de usuário de usuário logar e ir parar no perfil do outro
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setProfile(profile);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        profile,
        loading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
