import Cookies from 'js-cookie'
import React, { useState } from 'react'
import api from '../../api'
import useLink from '../../hooks/useLink'
import useLoader from '../../hooks/useLoader'
import Input from '../Input'
import Loader from '../Loader'
import './styles.scss'

export default function CardRegister() {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [areDifferents, setAreDifferents] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const { closeLoader, openLoader } = useLoader()
  const { goSignIn } = useLink()

  async function register() {

    if (password != confirmPassword) {
      setAreDifferents(true)
      return;
    }
    openLoader()
    try {
      await api.post('user/create', {
        first_name,
        last_name,
        email,
        password
      })
      goSignIn()
    }
    catch (error: any) {
      alert(error.response.data.message)
      setIsUsed(true)
    } finally {
      closeLoader()
    }

  }

  return (
    <div className="containerRegister">
      <div className="animate__animated animate__fadeInUp">
        <div className="contentCardRegister">
          <h1>Name</h1>
          <Input placeholder="Type your name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
          <h1>Last name</h1>
          <Input placeholder="Type your last name" onChange={(e) => setLastName(e.target.value)} value={last_name} />
          <h1>Email</h1>
          <Input hasError={isUsed} placeholder="Type your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <h1>Password</h1>
          <Input type="password" placeholder="Type your password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
          {areDifferents ? <p className="errorPassword">Passwords must be the same</p> : <></>}
          <button className="button" onClick={register}>Register</button>
          <p>Do you have an account?</p>
          <strong onClick={goSignIn}>Sign in</strong>
        </div>
      </div>
    </div>
  )
}
