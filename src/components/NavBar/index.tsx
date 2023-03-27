
import React, { useState, useEffect } from 'react'
import api from '../../api'
import './styles.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import ForumIcon from '@mui/icons-material/Forum';
import useLink from '../../hooks/useLink';

export default function NavBar() {
  const [userData, setUserData] = useState<any>({})
  const { goToPosts, goToUser, logout } = useLink()

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
  }

  useEffect(() => { getInfo() }, [])

  return (
    <div className="content">
      <div className="logo">
        <img className="logoImg" src={require("../../assets/images/logo.png")} alt="logo" />
        <h1>Starship</h1>
      </div>
      <div className="welcomeQuote">
        <h1>Welcome,<strong onClick={goToUser}>{userData.first_name}!</strong></h1>
      </div>
      <div className="icons">
        <ForumIcon className="forum" onClick={goToPosts} />
        <LogoutIcon className="logout" onClick={logout} />
      </div>
    </div>
  )
}