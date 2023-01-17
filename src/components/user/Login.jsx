import React, { useState } from 'react'
import { useForm } from "../../hooks/useForm"
import { Global } from "../../helpers/Global"
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { form, changed } = useForm({});
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const logUser = async (e) => {
    e.preventDefault();

    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json"
      }
    })

  
    const response = await request.json()
    setData(response);
    console.log(response);

    //Si se identifica correctamente se guardan sus datos en el navegador
    if (response.status === "success") {
      const loggedUser = {
        user: response.user,
        token: response.token
      }

      localStorage.setItem("token", JSON.stringify(loggedUser))

      setTimeout(() => {
        window.location.reload();
      },1000)
    }

  }


  return (
    <>
      {data.status &&
        <div className={data.status === "success" ? "content__register content__success" : "content__register content__error"}>
        <h2>{data.message}</h2>
      </div>
      }
        
      <header className='content__header'>
        <h1 className='content__title'>Login</h1>
      </header>

      <div className="content__posts">

        < form className='register-form' onSubmit={logUser}>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <button type="submit" className='btn btn-success'>Iniciar sesión</button>

        </form>

      </div>
    </>
  )
}
