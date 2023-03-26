import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import './warning.modules.scss'

export default function WarningDelete() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="warningBox">
      <div className="delete">
        <strong>Delete account</strong>
        <p>After deleting your account, you are aware you will never access you account until you create a new one.</p>
        <button onClick={() => setShowModal(true)}>Delete</button>
        <Modal isOpen={showModal} setIsOpen={setShowModal} />
      </div>
    </div>
  )
}