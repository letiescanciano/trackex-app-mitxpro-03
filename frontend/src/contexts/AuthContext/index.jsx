import { useState, createContext } from 'react'
import firebase from './firebaseConfig'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.login(email, password)
      const user = userCredential.user
      user.getIdToken().then(token => {
        console.log('token', token)
        localStorage.setItem('token', token)
      })
      console.log(user)
      setAuth(user)
      navigate('/transactions')
    } catch (er) {
      console.log(er)
    }
  }

  const logout = async () => {
    console.log('logout')
    try {
      await firebase.logout()
      setAuth(null)
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Routes
// /login, /, /signup
// completar el contexto auth
// logout
