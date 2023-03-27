import React, { useContext, useEffect, useState } from 'react';
import PostArea from '../../components/PostArea';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { communityPosts } from '../../utils/posts';
import './styles.scss'
import { PostsContext } from '../../contexts/postsContext';
import useLoader from '../../hooks/useLoader';
import api from '../../api';
import ModalDeletePost from '../../components/ModalDeletePost';
import ModalEditPost from '../../components/ModalEditPost';

export default function Posts() {
  const [userData, setUserData] = useState<any>({})
  const { posts, setPosts } = useContext(PostsContext);
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [titleEdit, setTitleEdit] = useState<string>('')
  const [descriptionEdit, setDescriptionEdit] = useState<string>('')
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [postID, setPostID] = useState<string>('')
  const [isWarning, setIsWarning] = useState('')
  const { closeLoader, openLoader } = useLoader()

  useEffect(() => {
    getPosts()
    getInfo()
  }, [])

  async function getInfo() {
    const { data } = await api.get('user/get-me')
    setUserData(data)
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

  async function getPosts() {
    const { data } = await api.get('post/all')
    setPosts(data)
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

  return (
    <div className="postsContainer">
      <div className="postsContent">
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
        <div className="containerCommunity">
          <div className="containerCommunityPosts">
            <h1 className="communityPostsTitle">Community Posts</h1>
            <div className="allPostsContainer">
              <div className="yourPosts">
                {posts.map((item: any) => (
                  <div key={item?.id} className="box">
                    <div className="avatar">
                      <img src={require(`../../assets/images/${userData.avatar}.png`)} alt="avatar" />
                      <h1 className="username"><strong>{userData.first_name}</strong> says</h1>
                    </div>
                    <div className="tools">
                      <EditIcon className="iconEdit" onClick={() => openEditPostModal(item)} />
                      <DeleteOutlineIcon className="iconDelete" onClick={() => openDeletePostModal(item.id)} />
                    </div>
                    <div className="title">
                      <h1>
                        {item.title}
                      </h1>
                    </div>
                    <p className="description">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="communityPostsMap">
                {communityPosts.map((item) => (
                  <div className="post" key={item.id}>
                    <div className="avatar">
                      <img src={require(`../../assets/images/${item.avatar}.png`)} alt="avatar" />
                      <h1 className="username"><strong>{item.name}</strong> says</h1>
                    </div>
                    <div className="post">
                      <div className="title">
                        <h1>{item.title}</h1>
                      </div>
                      <div className="description">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
    </div>
  )
}
