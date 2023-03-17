import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={SignIn} path="/sign-in" />
        <Route Component={SignUp} path="/sign-up" />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages;