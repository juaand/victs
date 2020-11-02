import React, {useState, createContext, useCallback, useContext} from 'react'
import {logOut} from '../services/ApiClient'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const login = useCallback(user => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    logOut()
    localStorage.removeItem('user')
    setUser(undefined)
    document.querySelector('.__grayHeader').classList.remove('__grayHeader')
  }, [])

  const updateInfoUser = useCallback((data) => {
    setUser(data)
  }, [])

  const value = {user, login, logout, updateInfoUser}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
