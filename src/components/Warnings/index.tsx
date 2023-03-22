import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal'

export default function Warnings() {

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  function goEdit() {
    navigate('edit')
  }

  return (
    <div className="warnings">
      <div className="delete">
        <strong>Delete account</strong>
        <p>After deleting your account, you are aware you will never access you account until you create a new one.</p>
        <button onClick={() => setShowModal(true)}>Delete</button>
        <Modal isOpen={showModal} setIsOpen={setShowModal} />
      </div>
      <div className="edit">
        <strong>Edit</strong>
        <p>You think your account is outdated? Do not worry! There is time enough to update it yet.</p>
        <button onClick={goEdit}>Edit</button>
      </div>
    </div>
  )
}