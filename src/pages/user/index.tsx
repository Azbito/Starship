import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import Modal from '../../components/Modal'
import './styles.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import { PostsContext } from '../../contexts/postsContext'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import numberConvert from '../../utils/numberConverter'
import YourPosts from '../../components/YourPosts'
import PostArea from '../../components/PostArea'
import useLoader from '../../hooks/useLoader'
import useLink from '../../hooks/useLink'

export default function User() {
  const { posts, setPosts } = useContext(PostsContext);
  const [userData, setUserData] = useState<any>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isWarning, setIsWarning] = useState('')
  const { closeLoader, openLoader } = useLoader()
  const { goToSettings } = useLink()

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
  }

  async function getPosts() {
    const { data } = await api.get('post/all')
    setPosts(data)
  }

  async function post() {
    if (!title || !description) {
      setIsWarning("You cannot talk anything. Please, type something.")
      return;
    }

    if (title || description) {
      setIsWarning('')
      try {
        await api.post('post/create', {
          title,
          description
        })
        openLoader()
        getPosts()
        setTitle('')
        setDescription('')
      } catch (error) {
        alert("Please, try it again")
      } finally {
        closeLoader()
      }
    }
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
                <SettingsIcon onClick={goToSettings} />
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
        <PostArea titleValue={title}
          onChangeTitle={(e: any) => {
            setTitle(e.target.value)
            setIsWarning('')
          }}
          descriptionValue={description}
          onChangeDescription={(e: any) => {
            setDescription(e.target.value)
            setIsWarning('')

          }}
          onClick={post}
          errorWarning={isWarning}
        />
        <h1 className="postsTitle">Your Posts</h1>
        <YourPosts />
      </div>
      <Modal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal} />
    </>
  )
}