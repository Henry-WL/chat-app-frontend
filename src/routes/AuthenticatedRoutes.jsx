import React, { useContext, useEffect } from 'react'
import authContext from '../context/auth-context'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Chat from './Chat'
import Login from './Login'
import ErrorPage from '../error-page'

function AuthenticatedRoutes() {
    const navigate = useNavigate()
    const {isLoggedIn} = useContext(authContext)


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }

    }, [isLoggedIn, navigate])
  return (
    <Routes>
    <Route path="/" element={<Chat />} />
    <Route path="/login" element={<Login />} />
    {/* Define other routes here */}
    <Route path="*" element={<ErrorPage />} />
  </Routes>
  )
}

export default AuthenticatedRoutes