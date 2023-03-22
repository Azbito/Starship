import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import './styles.scss'

export default function CardRegister() {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isUsed, setIsUsed] = useState(false);

  const navigate = useNavigate()

  const goSignIn = () => {
    navigate("/sign-in")
  }

  async function register() {
    try {
      await api.post('user/create', {
        first_name,
        last_name,
        email,
        password
      })
      navigate("/sign-in")
    } catch (error: any) {
      alert(error.response.data.message)
      setIsUsed(true)
    }
  }

  return (
    <div className="contentCardRegister">
      <h1>Name</h1>
      <input className="input" placeholder='Type your name' onChange={(e: any) => setFirstName(e.target.value)} maxLength={240} />
      <h1>Last name</h1>
      <input className="input" placeholder='Type your last name' onChange={(e: any) => setLastName(e.target.value)} maxLength={240} />
      <h1>Email</h1>
      <input className={isUsed ? "usedemailinput" : "emailinput"} placeholder='Type your email' type="email" onChange={(e: any) => setEmail(e.target.value)} maxLength={240} />
      <h1>Password</h1>
      <input className="input" placeholder="Type your password" type="password" onChange={(e: any) => setPassword(e.target.value)} maxLength={240} />
      <button className="button" onClick={register}>Register</button>

      <p>Do you have an account? <strong onClick={goSignIn}>Sign in</strong></p>
    </div>
  )
}