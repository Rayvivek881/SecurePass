import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

import { GlobalState, PasswordDataInteface } from '../Interfaces/Interfaces'

const initialState : GlobalState = {
  user : null,
  passwordData : { 
    currentPage : 0, 
    rowsPerPage : 20, 
    Arr : [], 
    totalDataCount : 0,
    filter : '',
  },
  accessToken : null,
  refreshToken : null,
  loading : true,
  currentTab : "passwords"
}

export const GlobalContext = createContext<GlobalState>(initialState);

export const GlobalProvider = ({ children }: any) => {
  const [state, setState] = useState(initialState);

  const setUser = (user : any) => {
    setState((prevState) => ({
      ...prevState, user
    }));
  }

  const setCurrentTab = (currentTab : string) => {
    setState((prevState) => ({
      ...prevState, currentTab
    }));
  }

  const setAccessToken = (accessToken : string) => {
    setState((prevState) => ({
      ...prevState, accessToken
    }));
  }

  const setPasswordData = (passwordData : PasswordDataInteface) => {
    setState((prevState) => ({
      ...prevState, passwordData
    }));
  }

  const setTokens = (accessToken : string, refreshToken : string) => {
    setState((prevState) => ({
      ...prevState, accessToken, refreshToken
    }));
  }

  const setNotifications = (notifications : String) => {

  }

  return (
    <GlobalContext.Provider value={{
      user : state.user,
      passwordData : state.passwordData,
      accessToken : state.accessToken,
      loading : state.loading,
      currentTab : state.currentTab,
      setUser, setPasswordData, setAccessToken, setTokens, setNotifications, setCurrentTab
    }}>
      {children}
    </GlobalContext.Provider>
  );
}