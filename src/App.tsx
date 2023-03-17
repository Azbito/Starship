import React, { useState } from 'react';
import Cookies from 'js-cookie'
import CardLogin from './components/CardLogin';
import api from './api';
import Pages from './routes';
import NavBar from './components/NavBar';
import './styles/global.scss'
function App() {
  return (
    <>
      <Pages />
    </>
  )
}

export default App;
