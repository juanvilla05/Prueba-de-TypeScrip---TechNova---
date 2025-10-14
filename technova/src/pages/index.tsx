import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthProvider";
import {MiButton} from "@/components/Button";


export const Login = () => {

  const [user,setUser] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const router = useRouter();

  const handlePasswordUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  }

  const handleClick = async () =>{ 
    const isLogin = await login(user, password);
    if (isLogin){
      router.push('/dashboard')
      console.log('Se entra al sistema')
    }else{
      console.log('No se encontro el usuario')
      router.push('/')
      setUser('');
      setPassword('');
    }
  }

  return (
    <div>
      <div>
        <h1>TechNovaProducts</h1>
        <h3>
          Ingresa usuario y contraseña
        </h3>

        <div>
          <div>
            <label>Usuario:</label>
            <input
              value={user}
              onChange={handleChangeUser}
              type="text"
              placeholder="Tu usuario"
            />
          </div>

          <div>
            <label>Contraseña:</label>
            <input
              value={password}
              onChange={handlePasswordUser}
              type="password"
              placeholder="Tu contraseña"
            />
          </div>

          <MiButton
            textButton="Ingresar"
            click={handleClick}
          />
        </div>
      </div>
    </div>
  )
}


export default Login;
