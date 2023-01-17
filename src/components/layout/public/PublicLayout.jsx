import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Header } from './Header'


export const PublicLayout = () => {

  const { auth } = useAuth();

  return (
    <>
        {/*Layout */}
        <Header />

        {/* Contenido principal */}
        <section className='layout__content'>
          {!auth._id ?
            <Outlet />
          :
            <Navigate to="/social" />  
          }
            
        </section>
    </>
  )
}
