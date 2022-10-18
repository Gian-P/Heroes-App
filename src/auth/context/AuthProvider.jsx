//El AuthProvider utiliza el AuthContext con el objetivo de que este sea el componente que sirve para proveer la informacion a toda mi aplicacion.

import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

const init = () => {
  const user = JSON.parse( localStorage.getItem('user') );

  return {
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ( { children } ) => {

  const [ authState, dispatch ] = useReducer( authReducer, {}, init )

  // No es correcto mandar la variable dispatch dentro del Provider, porque le estamos dando demasiado poder a los demas componentes, para solucionar esto creamos una funcion login que nos permite evitar pasar directamente la funcion dispatch, sino que pasamos la funcion login y ella es la que llama a dispatch. 

  const login = (name = '') => {

    const user = { id: 'ABC', name };

    const action = {
      type: types.login,
      payload: user
    }

    localStorage.setItem('user', JSON.stringify( user ));
    dispatch(action);
  }

  const logout = () => {
    localStorage.removeItem('user');
    const action = {
      type: types.logout,
    };
    dispatch( action );
  }

  return (
    <AuthContext.Provider value={{ 
      ...authState,

      //Methods
      login,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  );
}
