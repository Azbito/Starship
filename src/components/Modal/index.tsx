import ModalComponent from 'react-modal';
import { Dispatch, SetStateAction, useState } from 'react';
import './styles.scss'
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useLink from '../../hooks/useLink';

type ModalProps = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ isOpen, setIsOpen }: ModalProps) {
  const { goHome } = useLink()
  const [showModal, setShowModal] = useState(false)

  async function deleteAccount() {
    await api.delete('user/delete-me')
    goHome()
    Cookies.remove("token")
  }


  return (
    <ModalComponent
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: "blur(.2rem)",
          transition: "2s"
        },
        content: {
          position: 'absolute',
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: 'transparent',
          border: 'none',
          width: "40rem",
          height: "30rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

        }
      }}
      contentLabel="Example Modal"
    >
      <div>
        <div className="warning">
          <h1>Are you sure?</h1>
          <p>Remember you will never access your account until you create a new one.</p>
          <button onClick={deleteAccount}>I am sure!</button>
        </div>
      </div>
    </ModalComponent>
  )
}