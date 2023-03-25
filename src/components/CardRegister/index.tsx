import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import Input from '../Input'
import Loader from '../Loader'
import './styles.scss'

export default function CardRegister() {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUsed, setIsUsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const goSignIn = () => {
    navigate("/sign-in")
  }

  async function register() {

    if (password != confirmPassword) {
      alert("Passwords must be the same")
      return;
    }

    setIsLoading(true)
    try {
      await api.post('user/create', {
        first_name,
        last_name,
        email,
        password
      })
      setIsLoading(false)
      navigate("/sign-in")
    }
    catch (error: any) {
      alert(error.response.data.message)
      setIsUsed(true)
    } finally {
      setIsLoading(false)
    }

  }



  return (
    <main className="card">
      <div className="contentCardRegister">
        <h1>Name</h1>
        <Input placeholder="Type your name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
        <h1>Last name</h1>
        <Input placeholder="Type your last name" onChange={(e) => setLastName(e.target.value)} value={last_name} />
        <h1>Email</h1>
        <Input placeholder="Type your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <h1>Password</h1>
        <Input placeholder="Type your password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <Input placeholder="Confirm your password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />

        <button className="button" onClick={register}>Register</button>
        {isLoading && <Loader />}

        <p>Do you have an account?</p>
        <strong onClick={goSignIn}>Sign in</strong>
      </div>
    </main>
  )
}
