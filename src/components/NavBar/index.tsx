import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import './styles.scss'

export default function NavBar() {
  const [userData, setUserData] = useState<any>({})

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
  }

  function logout() {
    Cookies.remove('token')
    window.location.reload()
  }

  useEffect(() => { getInfo() }, [])

  return (
    <div className="content">
      <h1 className="logo">Snowly</h1>
      <div className="paths">
        <h1>Welcome,<strong>{userData.first_name}!</strong></h1>
      </div>
      <h1 className="logout" onClick={logout}>Logout</h1>
    </div>
  )
}