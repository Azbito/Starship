import React, { useState } from 'react'
import Modal from '../Modal'
import './styles.scss'

export default function WarningDelete() {
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