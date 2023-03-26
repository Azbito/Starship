import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import Modal from '../../components/Modal'
import PostBox from '../../components/PostBox'
import './user.modules.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import { PostsContext } from '../../contexts/postsContext'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import numberConvert from '../../utils/numberConverter'

export default function User() {
  const { posts } = useContext(PostsContext);
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
            <img className="avatar" src={require(`../../assets/images/${userData?.avatar ?? undefined}.png`)} alt={userData.avatar} />
            <div className="quantityPosts">
              <HistoryEduIcon className="icon" />
              {posts.length >= 1000 ? <h1>{numberConvert(posts.length)}</h1> : <h1>{posts.length}</h1>}
            </div>
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