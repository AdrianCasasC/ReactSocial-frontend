import React from 'react'
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Loading } from '../general/Loading'

export const PrivateLayout = () => {

  const { auth, isLoading } = useAuth();

  return (
    <>
      {/*Layout */}
      {isLoading ?
        <Loading />
        :
        (
          <>
            <Header />

            <section className='layout__content'>
              {auth._id ?
                <Outlet />
                :
                <Navigate to="/login" />
              }

            </section>

            <Sidebar />
          </>

        )
      }
    </>
  )
}
