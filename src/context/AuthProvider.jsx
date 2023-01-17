import React, { createContext, useState, useEffect } from 'react'
import { Global } from "../helpers/Global"

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [authProfile, setAuthProfile] = useState({});
    const [counters, setCounters] = useState({});
    const [userPublications, setUserPublications ] = useState([])
    const [publications, setPublications] = useState([]);
    const [ deletedItems, setDeletedItems ] = useState(0);

    useEffect(() => {
      authUser();
    },[]);

    const authUser = async() => {
      //Sacar datos del usuario identificado del localStorage
      const {user, token} = await JSON.parse(localStorage.getItem("token"));

      //Comprobar si existe el user y el token
      const request = await fetch(Global.url + "user/profile/" + user.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": token
        }
      });

      const requestCounters = await fetch(Global.url + "user/counters/" + user.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": token
        }
      });

      //Transformar los datos en un objeto javaScript
      const response = await request.json();
      const responseCounters = await requestCounters.json();
      
      //Cuando ya se han conseguido todos los datos se pone loading a false
      //setIsLoading(false);

      //Setear el estado
      setAuth(response.user);
      setCounters(responseCounters);

    }

    const sharedValues = {
        auth,
        setAuth,
        counters,
        setCounters,
        publications,
        setPublications,
        userPublications,
        setUserPublications,
        deletedItems,
        setDeletedItems,
        authProfile,
        setAuthProfile
    }


  return (
    <AuthContext.Provider value={sharedValues}>
        {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
