import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() { //funcao para utilizar o context api em qualquer lugar do codigo
  return useContext(AuthContext);
}