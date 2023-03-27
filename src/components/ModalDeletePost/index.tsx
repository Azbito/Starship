import ModalComponent from 'react-modal';
import './modaldeletepost.modules.scss';

type ModalProps = {
  isOpen: boolean,
  onClick: () => void,
  onRequestClose: () => void
}

export default function ModalDeletePost({ isOpen, onClick, onRequestClose }: ModalProps) {

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
          <h1>Are you sure?</h1>
          <p>Remember it will never came back once you create a new one.</p>
          <button className="deleteButton" onClick={onClick}>I am sure!</button>
        </div>
      </div>
    </ModalComponent >
  )
}