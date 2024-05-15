import React, { useContext, useState } from 'react'
import authContext from '../context/auth-context'
import { useNavigate } from 'react-router-dom'


function login() {
    const [isSignup, setIsSignup] = useState(false)
    const {login, setIsLoggedIn} = useContext(authContext)

    const navigate = useNavigate()

    const login_signupHandler = async () => {
      console.log('clicked login signup')
      // const response = await fetch('http://localhost:3000/api/chats/')
      // const chats = await response.json()
      // console.log(chats)
      
      // if Login... else signup...
  
      let response;
      if (isSignup) {
        console.log('signup')
        response = await fetch('http://localhost:3000/api/users/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": "newfronten@x.com",
            "username": "testingAuthContext!",
            "password": "123456789"
        })});

        // auth.login('kik')
        
        
      } else {
        console.log('login')
        response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": "newfronten@x.com",
            "password": "123456789"
        })});

        const data = await response.json()

        console.log(data, 'data')
        login(data.token, data._id, data.username)
        setIsLoggedIn(true)
        navigate('/')
        
        
        
        // set context token, setlogin etc....
      }
  
    
      const user = await response.json()

    //   setUser(user.username)
  
      console.log(user)
    }
  
    return (
      <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://em-content.zobj.net/source/apple/391/man-technologist-medium-light-skin-tone_1f468-1f3fc-200d-1f4bb.png" alt="ChatApp"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">ChatMe</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
        <div className="flex items-center justify-between">
          <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          </div>
          <div className="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        {isSignup &&<div>
          <div className="flex items-center justify-between">
          <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          </div>
          <div className="mt-2">
            <input id="username" name="username" type="text" autocomplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>}
  
        <div>
          <div className="flex items-center justify-between">
            <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            {/* <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div> */}
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={login_signupHandler}>{isSignup ? 'Signup' : 'Login'}</button>
        </div>
      </form>
  
      {!isSignup &&  <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setIsSignup(true)}> Signup now!</a>
  
      </p>}
  
      {isSignup &&    <p className="mt-10 text-center text-sm text-gray-500">
        Have an account?
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setIsSignup(false)}> Login now!</a>
        
      </p>}
      
    </div>
  </div>
      </>
    )
}

export default login