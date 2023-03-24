import React, { useContext, useEffect, useState } from 'react'
import api from '../../api'
import Loader from '../Loader'
import './styles.scss'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalDeletePost from '../ModalDeletePost';
import EditIcon from '@mui/icons-material/Edit';
import ModalEditPost from '../ModalEditPost';
import { PostsContext } from '../../contexts/postsContext';
import useLoader from '../../hooks/useLoader';

export default function PostBox() {
  const { posts, setPosts } = useContext(PostsContext);
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [titleEdit, setTitleEdit] = useState<string>('')
  const [descriptionEdit, setDescriptionEdit] = useState<string>('')
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [postID, setPostID] = useState<string>('')
  const { closeLoader, openLoader } = useLoader()

  async function post() {
    openLoader()
    try {
      await api.post('post/create', {
        title,
        description
      })
      getPosts()
      setTitle('')
      setDescription('')
    } catch (error) {
      alert("Please, try it again")
    } finally {
      closeLoader()
    }
  }

  async function openDeletePostModal(id: string) {
    setPostID(id)
    setIsOpenDelete(true)
  }

  async function openEditPostModal(post: any) {
    setPostID(post?.id)
    setTitleEdit(post.title)
    setDescriptionEdit(post.description)
    setIsOpenEdit(true)
  }

  async function handleEdit() {
    openLoader()
    try {
      await api.patch(`post/update/${postID}`, {
        title: titleEdit,
        description: descriptionEdit
      })
      getPosts()

    } catch (error) {
      alert("Please, try it again")
    } finally {
      closeLoader()
      setIsOpenEdit(false)
    }
  }

  async function handleDelete() {
    openLoader()

    try {
      await api.delete(`post/delete/${postID}`)
      getPosts()
    } catch (error) {
      alert("Please, try it again")
    } finally {
      closeLoader()
      setIsOpenDelete(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    const { data } = await api.get('post/all')
    setPosts(data)
  }

  return (
    <>
      <div className="postContainer">
        <p>What's happening?</p>
        <input placeholder="Title" value={title} onChange={(e: any) => setTitle(e.target.value)} maxLength={240} />
        <textarea placeholder="Tell us what is happening today!" value={description} onChange={(e: any) => setDescription(e.target.value)} maxLength={240} />
        <span style={{ color: description.length == 240 ? "red" : "white" }}>{`${(240 - description?.length)} characters left`}</span>
        <button onClick={post}>Post</button>
      </div>
      <div className="allPostsContainer">
        <p className="postsTitle">Posts</p>
        {posts.length > 0 ? posts.map((item: any) => (
          <div key={item?.id} className="box">
            <div className="tools">
              <EditIcon className="iconEdit" onClick={() => openEditPostModal(item)} />
              <DeleteOutlineIcon className="iconDelete" onClick={() => openDeletePostModal(item.id)} />
            </div>
            <div className="header">
              <div className="title">
                <h1>
                  {item.title}
                </h1>
              </div>
            </div>
            <p className="description">{item.description}</p>
          </div>
        )) : <p>Is there anyone else in here?</p>
        }
        <ModalDeletePost onRequestClose={() => {
          setPostID('')
          setIsOpenDelete(false)
        }} isOpen={isOpenDelete} onClick={handleDelete} />

        <ModalEditPost titleValue={titleEdit} onChangeTitle={(e: any) => setTitleEdit(e.target.value)} descriptionValue={descriptionEdit} onChangeDescription={(e: any) => setDescriptionEdit(e.target.value)} isOpen={isOpenEdit} onClick={handleEdit} onRequestClose={() => {
          setPostID('')

          setTitleEdit('')
          setDescriptionEdit('')
          setIsOpenEdit(false)
        }} />

      </div>
    </>
  )
}