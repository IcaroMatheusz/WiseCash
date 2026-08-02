import { createContext, useState } from "react";
import { supabase } from "../lib/supabase";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

//USANDO CONTEXTAPI PRA LIDAR COM A AUTENTICACAO (LOGOUT, REGISTRO E LOGIN)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  async function login(email, password) {
    //LOGIN
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);

    return { success: true, message: "Usuário logado!" };
  }


  //register
  async function register( email, password, username) {
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
        success: false, message: error.message
     };
    }

    const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        name: username,
    });

    if (profileError) {
        return {
            success: false,
            message: "Conta criada, mas houve um erro ao salvar o usuário"
        }
    }

    return {
        success: true,
        message: "Conta criada com sucesso"
    }
      
    }

  async function logout() {
    //LOGOUT
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  }


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
