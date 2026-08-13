import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

//USANDO CONTEXTAPI PRA LIDAR COM A AUTENTICACAO (LOGOUT, REGISTRO E LOGIN)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //salvando o usuario
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(profile);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  async function login(email, password) {
    //LOGIN
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

    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    setUser(data.user);

    return { success: true, message: "Usuário logado!" };
  }

  //register
  async function register(email, password, username) {
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

    const { error: profileError } = await supabase.from("profiles").insert({
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

  async function logout() {
    //LOGOUT
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  }

  async function refreshProfile(userId) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  }

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
