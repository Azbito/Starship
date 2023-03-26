import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import Input from '../../../components/Input';
import WarningDelete from '../../../components/Warning';
import { PostsContext } from '../../../contexts/postsContext';
import './settings.modules.scss'
export default function Settings() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [samePassword, setSamePassword] = useState(false)
  const [isUsed, setIsUsed] = useState(false);
  const isDisabled: boolean = !first_name || !last_name || !email || !password || !confirmPassword
  const navigate = useNavigate()

  async function updateInfo() {
    if (password != confirmPassword) {
      setSamePassword(true)
      return;
    }

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
      <div className="animate__animated animate__fadeInUp">
        <div className="contentBox">
          <strong>Update your data</strong>
          <h1>Name</h1>
          <Input placeholder="Type your name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
          <h1>Last name</h1>
          <Input placeholder="Type your last name" onChange={(e) => setLastName(e.target.value)} value={last_name} />
          <h1>Email</h1>
          <Input placeholder="Type your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <h1>Password</h1>
          <Input placeholder="Type your password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <Input placeholder="Confirm your password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
          {samePassword ? <p>Passwords must be the same</p> : <></>}
          <button onClick={updateInfo} disabled={isDisabled} className={isDisabled ? "buttonDisabled" : "button"}>Update</button>
        </div>
      </div>
      <div className="animate__animated animate__fadeInRight">
        <WarningDelete />
      </div>
    </div>
  )
}