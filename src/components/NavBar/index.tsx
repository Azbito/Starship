import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import api from '../../api'
import './styles.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import ForumIcon from '@mui/icons-material/Forum';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [userData, setUserData] = useState<any>({})
  const navigate = useNavigate()

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
  }

  function logout() {
    Cookies.remove('token')
    window.location.reload()
  }

  function goToPosts() {
    navigate('/posts')
  }

  useEffect(() => { getInfo() }, [])

  return (
    <div className="content">
      <div className="logo">
        <img className="logoImg" src="../../../images/icon.png" alt="logo" />
        <h1>Starship</h1>
      </div>
      <div className="welcomeQuote">
        <h1>Welcome,<strong>{userData.first_name}!</strong></h1>
      </div>
      <div className="icons">
        <ForumIcon className="forum" onClick={goToPosts} />
        <LogoutIcon className="logout" onClick={logout} />
      </div>
    </div>
  )
}