import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie'
import CardLogin from './components/CardLogin';
import api from './api';
import Pages from './routes';
import NavBar from './components/NavBar';
import './styles/global.scss'
import { PostsContextProvider } from './contexts/postsContext';
import { LoaderContext, LoaderContextProvider } from './contexts/loaderContext';
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
