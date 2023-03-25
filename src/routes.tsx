import Cookies from "js-cookie";
import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Posts from "./pages/posts";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import User from "./pages/user";
import Settings from "./pages/user/settings";

function Pages() {
  const token = Cookies.get("token")
  function ProtectRoutes({ children }: any) {
    if (!token) {
      return <Navigate to="/" />
    }
    return (
      <>
        <NavBar />
        {children}
      </>
    )
  }

  function PublicRoutes({ children }: any) {
    if (token) {
      return <Navigate to="/user" />
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes><Home /></PublicRoutes>} path="/" />
        <Route element={<PublicRoutes><SignIn /></PublicRoutes>} path="/sign-in" />
        <Route element={<PublicRoutes><SignUp /></PublicRoutes>} path="/sign-up" />
        <Route element={<ProtectRoutes><Posts /></ProtectRoutes>} path="/posts" />
        <Route element={<ProtectRoutes><User /></ProtectRoutes>} path="/user" />
        <Route element={<ProtectRoutes><Settings /></ProtectRoutes>} path="/user/settings" />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages;