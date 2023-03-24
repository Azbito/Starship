import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface PostsContextType {
  posts: PostProps[],
  setPosts: Dispatch<SetStateAction<PostProps[]>>
}

interface PostsContextProviderProps {
  children: ReactNode
}

interface PostProps {
  title: string,
  description: string
}

export const PostsContext = createContext({} as PostsContextType)

export const PostsContextProvider = ({ children }: PostsContextProviderProps) => {
  const [posts, setPosts] = useState<PostProps[]>([])

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  )
}