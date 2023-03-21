import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import Modal from '../../components/Modal'
import './styles.scss'

export default function User() {

  const [userData, setUserData] = useState<any>({})
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
  }

  function goEdit() {
    navigate('edit')
  }


  useEffect(() => { getInfo() }, [])

  return (
    <>
      <div className="containerUser">
        <div className="infobox">
          <p>First Name</p>
          <h1>{userData.first_name}</h1>
          <p>Last Name</p>
          <h1>{userData.last_name}</h1>
          <p>Email</p>
          <h1>{userData.email}</h1>
          <div className="warnings">
            <div className="delete">
              <strong>Delete account</strong>
              <p>After deleting your account, you are aware you will never access you account until you create a new one.</p>
              <button onClick={() => setShowModal(true)}>Delete</button>
            </div>
            <div className="edit">
              <strong>Edit</strong>
              <p>You think your account is outdated? Do not worry! There is time enough to update it yet.</p>
              <button onClick={goEdit}>Edit</button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={showModal} setIsOpen={setShowModal} />
    </>

  )
}