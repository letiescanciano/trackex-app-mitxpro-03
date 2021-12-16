import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login } from '../Auth/Login'
import { Signup } from '../Auth/Signup'
import { NavBar } from '../NavBar'
import { TransactionList } from '../TransactionList'
import { AuthContext } from '../../contexts/AuthContext'

const AppRoutes = () => {
  const { auth } = useContext(AuthContext)
  console.log('user', auth)
  if (auth) {
    return (
      <div className='layout'>
        <NavBar />
        <Routes>
          <Route path='transactions' element={<TransactionList />} />
        </Routes>
      </div>
    )
  }
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Routes>
  )
}

export { AppRoutes }
