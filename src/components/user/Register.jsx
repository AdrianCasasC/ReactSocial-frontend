import React, { useState } from 'react'
import { useForm } from "../../hooks/useForm"
import { Global } from "../../helpers/Global"
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const navigate = useNavigate();

  const { form, changed } = useForm();
  const [isSaved, setIsSaved] = useState(false);
  const [registerMessage, setRegisterMessage] = useState({});

  const saveUser = async (e) => {
    e.preventDefault();

    //Recogida de datos del formulario
    let newUser = form;

    //Guardar usuarios en el backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();
    console.log(data);

    setRegisterMessage(data);

    if (data) {
      setIsSaved(true);

      setTimeout(() => {
        setIsSaved(false);
        
      }, 3000)
    }

    if (data.status === "success") {

      setTimeout(() => {
        setIsSaved(false);
        navigate("/login");
      }, 2000)
      
    }



  }


  return (
    <>
      <header className='content__header'>
        <h1 className='content__title'>Registro</h1>
      </header>

      <div className="content__posts">

        {isSaved && (
          <div className={registerMessage.status === "success" ? "content__register content__success" : "content__register content__error"}>
            <h2>{registerMessage.message}</h2>
          </div>
        )}


        < form className='register-form' onSubmit={saveUser}>

          <div className='form-group'>
            <label htmlFor='name'>Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='surname'>Apellido</label>
            <input type="text" name="surname" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='nick'>Nickname</label>
            <input type="text" name="nick" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <button type="submit" className='btn btn-success'>Regístrate</button>

        </form>

      </div>
    </>
  )
}
