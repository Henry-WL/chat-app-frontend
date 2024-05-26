import React, { useContext, useEffect } from 'react'
import authContext from '../context/auth-context'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Chat from './Chat'
import Login from './Login'
import ErrorPage from '../error-page'
import Users from './Users'
import SingleUserPage from './SingleUserPage'

function AuthenticatedRoutes() {
    const navigate = useNavigate()
    const {isLoggedIn} = useContext(authContext)


    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }

    }, [isLoggedIn, navigate])


   // check local storage to see if browser has token info already
  
    return (
    <Routes>
    <Route path="/" element={<Chat />} />
    <Route path="/login" element={<Login />} />
    <Route path="/users" element={<Users/>} />
    <Route path="/user/:userId" element={<SingleUserPage />}/>
    {/* Define other routes here */}
    <Route path="*" element={<ErrorPage />} />
  </Routes>
  )
}

export default AuthenticatedRoutes