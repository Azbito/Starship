import React, { useState, useEffect } from 'react'
import api from '../../api'
import Modal from '../../components/Modal'
import './styles.scss'

export default function User() {
  // const [first_name, setFirstName] = useState();
  // const [last_name, setLastName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [isUsed, setIsUsed] = useState(false);
  const [userData, setUserData] = useState<any>({})
  const [showModal, setShowModal] = useState(false)

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
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
          <div className="delete">
            <strong>Delete account</strong>
            <p>After deleting your account, you are aware you will never access you account until you create a new one.</p>
            <button onClick={() => setShowModal(true)}>Delete</button>
          </div>
        </div>
      </div>
      <Modal isOpen={showModal} setIsOpen={setShowModal} />
    </>

  )
}