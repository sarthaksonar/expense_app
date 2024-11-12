import { createContext, useEffect, useState } from "react";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async()=>{
    const refresh = await axios.get('http://localhost:5000/user/refresh_token');
    setToken(refresh.data.accesstoken);
  }

  useEffect(()=>{
    const first = localStorage.getItem('firstLogin')
    
    if(first){
        refreshToken()
    }
  })


  const userAPI = UserAPI(token);

  const state = {
    token,
    userAPI
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
