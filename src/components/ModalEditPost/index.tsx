import ModalComponent from 'react-modal';
import { ButtonHTMLAttributes, ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles.scss';

type ModalProps = {
  isOpen: boolean,
  onClick: () => void,
  onRequestClose: () => void,
  titleValue: string,
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void
  descriptionValue: string,
  onChangeDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function ModalEditPost({ isOpen, onClick, onRequestClose, titleValue, onChangeTitle, descriptionValue, onChangeDescription }: ModalProps) {

  return (
    <ModalComponent
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
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
        <div className="warningPost">
          <h1>Edit your post</h1>
          <p>Got a mistake? Don't worry; I'm here.</p>
          <input placeholder="title" value={titleValue} onChange={onChangeTitle} />
          <textarea placeholder="description" value={descriptionValue} onChange={onChangeDescription} />
          <button onClick={onClick}>Save</button>
        </div>
      </div>
    </ModalComponent >
  )
}