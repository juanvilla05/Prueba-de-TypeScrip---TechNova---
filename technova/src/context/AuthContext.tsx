import { createContext, useContext, useState, ReactNode } from "react";
import { IUser, UserStore } from "@/users/UserStore";

// Tipado del contexto
interface AuthContextType {
  user: IUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const store = new UserStore();

  // Valida credenciales contra UserStore
  const login = (email: string, password: string): boolean => {
    const found = store.list().find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      console.log("✅ Login exitoso:", found);
      return true;
    }
    console.log("❌ Credenciales inválidas");
    return false;
  };

  const logout = () => {
    setUser(null);
    console.log("👋 Sesión cerrada");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
