import { useContext, useEffect, useState } from "react"
import api from "../../api";
import { PostsContext } from "../../contexts/postsContext";
import useLoader from "../../hooks/useLoader";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalDeletePost from '../ModalDeletePost';
import EditIcon from '@mui/icons-material/Edit';
import ModalEditPost from '../ModalEditPost';
import './yourposts.modules.scss'

export default function YourPosts() {

  const { posts, setPosts } = useContext(PostsContext);
  const [titleEdit, setTitleEdit] = useState<string>('')
  const [descriptionEdit, setDescriptionEdit] = useState<string>('')
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [postID, setPostID] = useState<string>('')
  const [isWarning, setIsWarning] = useState('')
  const { closeLoader, openLoader } = useLoader()

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
    if (!titleEdit || !descriptionEdit) {
      setIsWarning("You cannot talk anything. Please, fill the blanks.")
      return;
    }

    if (titleEdit || descriptionEdit) {
      setIsWarning('')
      try {
        await api.patch(`post/update/${postID}`, {
          title: titleEdit,
          description: descriptionEdit
        })
        openLoader()
        getPosts()

      } catch (error) {
        alert("Please, try it again")
      } finally {
        closeLoader()
        setIsOpenEdit(false)
      }
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

  async function getPosts() {
    const { data } = await api.get('post/all')
    setPosts(data)
  }

  useEffect(() => {
    getPosts()
  }, [])


  return (
    <div className="allPostsContainer">
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
      )) : <p className="empty">Is there anyone else in here?</p>
      }
      <ModalDeletePost onRequestClose={() => {
        setPostID('')
        setIsOpenDelete(false)
      }} isOpen={isOpenDelete} onClick={handleDelete} />

      <ModalEditPost
        titleValue={titleEdit}
        onChangeTitle={(e: any) => {
          setTitleEdit(e.target.value)
          setIsWarning('')
        }}
        descriptionValue={descriptionEdit}
        onChangeDescription={(e: any) => {
          setDescriptionEdit(e.target.value)
          setIsWarning('')
        }
        }
        isOpen={isOpenEdit}
        onClick={handleEdit}
        postError={isWarning}
        onRequestClose={() => {
          setIsWarning('')
          setPostID('')
          setTitleEdit('')
          setDescriptionEdit('')
          setIsOpenEdit(false)
        }} />

    </div>
  )
}