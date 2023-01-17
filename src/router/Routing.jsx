import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, NavLink } from "react-router-dom"
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Feed } from '../components/publication/Feed'
import { Login } from "../components/user/Login"
import { Logout } from '../components/user/Logout'
import { People } from '../components/user/People'
import { Register } from '../components/user/Register'
import { AuthProvider } from '../context/AuthProvider'
import { Config } from "../components/user/Config"
import { Timeline } from '../components/publication/Timeline'


export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Todas las rutas que empiecen por "/" cargaran los componentes aquí envueltos */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="inicio" element={<Feed />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="logout" element={<Logout />} />
            <Route path="gente" element={<People />} />
            <Route path="ajustes" element={<Config />} />
          </Route>

          <Route path="*" element={
            <div>
              <h1>Error 404</h1>
              <NavLink to="/">Volver al inicio</NavLink>
            </div>} >
          </Route>


        </Routes>
      </AuthProvider>

    </BrowserRouter>
  )
}
