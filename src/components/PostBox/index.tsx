import React, { useEffect, useState } from 'react'
import api from '../../api'
import Loader from '../Loader'
import './styles.scss'
export default function PostBox() {

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [surpassed, setSurpassed] = useState(false)

  async function post() {
    setIsLoading(true)

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
      setIsLoading(false)
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
        <span>{`${(240 - description?.length)} characters left`}</span>
        <button onClick={post}>Post</button>
        {isLoading && <Loader />}
      </div>
      <div className="allPostsContainer">
        <p className="postsTitle">Posts</p>
        {posts.length > 0 ? posts.map((item: any) => (
          <div key={item?.id} className="box">
            <h1 className="title">{item.title}</h1>
            <p className="description">{item.description}</p>
          </div>
        )) : <p>Is there anyone else in here?</p>
        }
      </div>
    </>
  )
}