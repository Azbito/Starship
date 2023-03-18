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

  useEffect(() => { getInfo() }, [])

  return (
    <div className="content">
      <h1 className="logo">Minuit</h1>
      <div className="paths">
        <h1>Welcome,<strong>{userData.first_name}!</strong></h1>
      </div>
    </div>
  )
}