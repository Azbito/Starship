import React from 'react';
import Pages from './routes';
import './styles/global.scss'
import { PostsContextProvider } from './contexts/postsContext';
import { LoaderContextProvider } from './contexts/loaderContext';
import Loader from './components/Loader';

function App() {

  return (
    <LoaderContextProvider>
      <PostsContextProvider>
        <Pages />
      </PostsContextProvider>
    </LoaderContextProvider>
  )
}

export default App;
