import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [isSignup, setIsSignup] = useState(true)

  const login_signupHandler = async () => {
    console.log('clicked login signup')
    // const response = await fetch('http://localhost:3000/api/chats/')
    // const chats = await response.json()
    // console.log(chats)
    
    // if Login... else signup...

    const response = await fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": "omgGGGG@x.com",
        "username": "frontend!",
        "password": "44444444"
    })});
    const user = await response.json()

    console.log(user)
  }

  return (
    <>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://em-content.zobj.net/source/apple/391/man-technologist-medium-light-skin-tone_1f468-1f3fc-200d-1f4bb.png" alt="ChatApp"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">ChatMe</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
      <div class="flex items-center justify-between">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        </div>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      {isSignup &&<div>
        <div class="flex items-center justify-between">
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
        </div>
        <div class="mt-2">
          <input id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>}

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          {/* <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div> */}
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={login_signupHandler}>{isSignup ? 'Signup' : 'Login'}</button>
      </div>
    </form>

    {!isSignup &&  <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setIsSignup(true)}> Signup now!</a>

    </p>}

    {isSignup &&    <p class="mt-10 text-center text-sm text-gray-500">
      Have an account?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setIsSignup(false)}> Login now!</a>
      
    </p>}
    
  </div>
</div>
    </>
  )
}

export default App
