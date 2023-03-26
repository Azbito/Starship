import React from 'react';
import { communityPosts } from '../../utils/posts';
import './posts.modules.scss'

export default function Posts() {
  return (
    <div className="containerCommunity">
      <div className="containerCommunityPosts">
        <h1 className="communityPostsTitle">Community Posts</h1>
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
  )
}