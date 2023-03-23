import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import Modal from '../../components/Modal'
import PostBox from '../../components/PostBox'
import './styles.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material'

export default function User() {

  const [userData, setUserData] = useState<any>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
  }

  function goSettings() {
    navigate('settings')
  }

  useEffect(() => { getInfo() }, [])

  return (
    <>
      <div className="containerUser">
        <div className="userData">
          <div className="picture">
            <p>Profile picture</p>
            <img className="avatar" src="images/chicken.png" alt="Chicken" />
          </div>
          <div className="profile">
            <div className="infobox">
              <div className="settings">
                <SettingsIcon onClick={goSettings} />
              </div>
              <p>First Name</p>
              <h1>{userData.first_name}</h1>
              <p>Last Name</p>
              <h1>{userData.last_name}</h1>
              <p>Email</p>
              <h1>{userData.email}</h1>
            </div>
          </div>
        </div>
        <PostBox />
      </div>
      <Modal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal} />
    </>
  )
}