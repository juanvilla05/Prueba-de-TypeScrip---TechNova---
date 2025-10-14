    // PARA TIPAR CREAMOS UNA INTERFACE QUE NOS SIRVE PARA TIPAR OBJETOS
    // el nombre de las props siempre en minuscula
    export interface MiButtonProps{
      variant?: "primary" | "secondary" | "danger" ;// define estilos de color (default: "primary").
      size?: "sm" | "md" | "lg" ;// define tamaños (default: "md").
      disable?: boolean; // deshabilita el botón (default: false).
      loading?: boolean; // muestra un estado de carga y bloquea clicks.
      click?: ()=>void; // acción al hacer click, y asi se tipan las props que reciben funciones
      leftIcon?: React.ReactNode; //ícono opcional antes del texto.
      rightIcon?: React.ReactNode; // ícono opcional después del texto.
      textButton?:string;
  };
  
  // no se puede tipar adentro del objeto, se hace por fuera del objeto con una interface que finalmente es con la que tipamos
  // como inicia mayuscula es un componente, retorna HTML, y la extencion tsx, COMPONENTE, lo dejamos export para utilizarlo mas adelante 
  // disable y loading las iniciamos en false, para que a la hora de llamar el componente en el index no aparezca ni desabilitado ni cargando.
  // las unicas props que le paso al className son las que cambian los estilos
  export const MiButton = ({textButton,click,rightIcon,variant,size,disable=false,loading=false,leftIcon}:MiButtonProps)=>{
  
  
      return (
      
              <button onClick={click}
              className={(`button
                  ${disable?'disable':''}
                  ${(size === 'sm'?'small':
                      size === 'md'? 'mediano':
                      size === 'lg'?'largo':'')}  
                  ${(variant==='primary'?'primary': //el primer primary es el nombre que tiene predeterminado la propiedad de la interfaz y el segundo es la palabra clave que se le va a agregar a la clase, siendo asi, esa palabra se tiene que crear en el css, para que añada los estilos de esa palabra, al estilo predeterminado que es button
                      variant==='secondary'?'secondary':
                      variant=== 'danger'?'danger':'')}`)}
                      disabled={loading || disable}> 
                      
              {leftIcon}{`${loading?'cargando..':textButton}`}{rightIcon}
  
              </button>
          
      );
  };