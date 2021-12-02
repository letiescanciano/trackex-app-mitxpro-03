import { useState, createContext } from 'react'
import firebase from './firebaseConfig'
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.login(email, password)
      console.log(userCredential)
    } catch (er) {
      console.log(er)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

// Routes
// /login, /, /signup
// completar el contexto auth
// logout
