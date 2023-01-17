import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../hooks/useAuth'
import { Global } from '../../helpers/Global';
import { useNavigate } from 'react-router-dom';

export const Config = () => {
  const [data, setData] = useState({});
  const [isConfig, setIsConfig] = useState(false);

  const { form, changed } = useForm();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const getConfigForm = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...auth,
      ...form
    }

    const { token } = await JSON.parse(localStorage.getItem("token"));
    console.log("auth", auth);
    console.log("form", form);
    console.log("updatedUser", updatedUser);

    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json",
        "Authorization": token,
        "Connection": "keep-alive",
        "Accept": "*/*"
      }
    });

    const response = await request.json();

    setData(response);
    setIsConfig(true);

    setTimeout(() => {
      setIsConfig(false);
    },1500)

    if (response.status === "success") {
      setAuth(response.user);
      
      const fileInput = document.querySelector("#profile");
      const formData = new FormData();
      formData.append('file0', fileInput.files[0])

      const requestFile = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      });

      const responseFile = await requestFile.json();
      console.log(responseFile.file.filename);
      if(responseFile.status === "success") {

        //Seteo el nombre de la imagen que es único para que renderize el componente cada
        //vez que se cambia de imagen
        setAuth(prevValues => {
          return {
            ...prevValues,
            image: responseFile.file.filename
          }
        });
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);

    }

  };

  return (
    <div className="content__posts">

      < form className='register-form' onSubmit={getConfigForm}>

        <div className='form-group'>
          <label htmlFor='name'>Nombre</label>
          <input type="text" name="name" defaultValue={auth.name} onChange={changed} />
        </div>

        <div className='form-group'>
          <label htmlFor='surname'>Apellido</label>
          <input type="text" name="surname" defaultValue={auth.surname} onChange={changed} />
        </div>

        <div className='form-group'>
          <label htmlFor='nick'>Nickname</label>
          <input type="text" name="nick" defaultValue={auth.nick} onChange={changed} />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" defaultValue={auth.email} onChange={changed} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Contraseña</label>
          <input type="password" name="password" onChange={changed} />
        </div>

        <div className='form-group'>
          <label htmlFor='bio'>Biografía</label>
          <textarea type="text" name="bio" defaultValue={auth.bio} onChange={changed} />
        </div>

        <div className='form-group'>
          <label htmlFor='image'>Foto de perfil</label>
          <input type="file" id="profile" name="image" onChange={changed} />
        </div>

        <button type="submit" className='btn btn-success config'>Actualizar</button>

      </form>
      {/**/}

      {isConfig &&


        <div className={data.status === "success" ? "content__register content__success" : "content__register content__error"}>
          <h2>{data.message}</h2>
        </div>
      }



    </div>
  )
}
