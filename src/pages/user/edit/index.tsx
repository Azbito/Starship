import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import './styles.scss'
export default function Edit() {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isUsed, setIsUsed] = useState(false);
  const isDisabled: boolean = !first_name || !last_name || !email || !password

  const navigate = useNavigate()

  async function updateInfo() {
    try {
      await api.patch('user/update-me', {
        first_name,
        last_name,
        email,
        password
      })
      navigate('/user')
    } catch (error: any) {
      alert(error.response.data.message)
      setIsUsed(true)
    }
  }

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setFirstName(data.first_name)
    setLastName(data.last_name)
    setEmail(data.email)
    setPassword(data.password)
  }

  useEffect(() => {
    getInfo()
  }, [])



  return (
    <div className="containerEdit">
      <div className="contentBox">
        <strong>Update your data</strong>
        <p>First Name</p>
        <input placeholder='First name' value={first_name} onChange={(e: any) => setFirstName(e.target.value)} />
        <p>Last Name</p>
        <input placeholder='Last name' value={last_name} onChange={(e: any) => setLastName(e.target.value)} />
        <p>Email</p>
        <input placeholder='Email' type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <p>Password</p>
        <input placeholder='Password' type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <button onClick={updateInfo} disabled={isDisabled} className={isDisabled ? "buttonDisabled" : "button"}>Update</button>
      </div>
    </div>
  )
}