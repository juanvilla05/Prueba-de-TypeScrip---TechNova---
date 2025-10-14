import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { findUser } from "../helpers/funcionLogin";
import { User } from "@/interfaces/user";


export const AuthProvider:React.FC<{ children: React.ReactNode }>  = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    //Con esto se carga el usuario del localStorage al iniciar la app
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, [])


    // Funcion para iniciar sesion 

    const login = async (username: string, password: string) => {

        const foundUser = await findUser(username, password);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("user", JSON.stringify(foundUser));
            return true;
        }
        return false
    }


    //Funcion para cerrar sesion 

    const logout = () =>{
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{user, login, loading, logout}}>
            {children}
        </AuthContext.Provider>
    );
};


// De esta fomra se crea un hook para utilizar el contexto

export const useAuth = (): AuthContextType =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context
}