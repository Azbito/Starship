import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import Loader from '../Loader'
import './styles.scss'

export default function CardLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const goSignUp = () => {
    navigate("/sign-up")
  }


  async function Login() {
    setIsLoading(true)
    try {
      const { data } = await api.post('auth/login', {
        email,
        password
      })
      Cookies.set("token", data.access_token, { expires: 7 })
      window.location.reload()
      setIsLoading(false)
    } catch (error) {
      alert("Not found")
      setIsLoading(false)
    }
  }

  return (
    <div className="containerCard">
      <h1>Login</h1>
      <input placeholder='Type your email' onChange={(e: any) => setEmail(e.target.value)} type="email" maxLength={240} />
      <h1>Password</h1>
      <input placeholder="Type your password" type="password" onChange={(e: any) => setPassword(e.target.value)} maxLength={240} />
      <button className="button" onClick={Login}>Login</button>
      <p>Do you not have an account yet?</p>
      <strong onClick={goSignUp}>Sign up</strong>
      {isLoading && <Loader />}
    </div>
  )
}