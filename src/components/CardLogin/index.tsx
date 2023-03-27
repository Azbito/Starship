import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import useLink from '../../hooks/useLink'
import Input from '../Input'
import Loader from '../Loader'
import './login.modules.scss'

export default function CardLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { goSignUp } = useLink()

  async function login(e: any) {
    setIsLoading(true)
    try {
      const { data } = await api.post('auth/login', {
        email,
        password
      })
      Cookies.set("token", data.access_token, { expires: 7 })
      window.location.href = "/user"
      setIsLoading(false)
    } catch (error) {
      alert("Not found")
      setIsLoading(false)
    }
  }

  return (
    <div className="containerSignIn">
      <div className="animate__animated animate__fadeInUp">
        <div className="containerCard">
          <h1>Login</h1>
          <Input placeholder='Type your email' onChange={(e: any) => setEmail(e.target.value)} type="email" value={email} />
          <h1>Password</h1>
          <Input placeholder="Type your password" type="password" onChange={(e: any) => setPassword(e.target.value)} value={password} />
          <button className="button" type={'button'} onClick={login}>Login</button>
          <p>Do you not have an account yet?</p>
          <strong onClick={goSignUp}>Sign up</strong>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  )
}