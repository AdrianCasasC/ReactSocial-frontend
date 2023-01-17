import React, { useState } from 'react'
import avatar from "../../../assets/img/user.png";
import { Global } from '../../../helpers/Global';
import { useAuth } from '../../../hooks/useAuth';

export const Sidebar = () => {
    const [isUpload, setIsUpload] = useState(false);
    const [noImage, setNoImage] = useState(false);

    const { auth, counters, setCounters, setUserPublications } = useAuth();
    const { token } = JSON.parse(localStorage.getItem("token"));

    const handlePublication = async (e) => {
        e.preventDefault();

        const publicationForm = {
            post: e.target.post.value,
            image: e.target.image.files[0]
        }
        console.log(publicationForm);

        if (publicationForm.image && publicationForm.post) {
            const request = await fetch(Global.url + "publication/save", {
                method: "POST",
                body: JSON.stringify({
                    text: publicationForm.post
                }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                }
            });

            const response = await request.json();
            console.log(response);

            if (response.status === "success") {
                const publicationId = response.publicationStored._id;
                console.log("publicId", publicationId);

                const requestDetail = await fetch(Global.url + "publication/detail/" + publicationId, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token
                    }
                });

                const responseDetail = await requestDetail.json()
                console.log(responseDetail);

                if (responseDetail.status === "success") {
                    setUserPublications(prevValues => {
                        return [responseDetail.publication, ...prevValues]
                    })

                }

                const fileInput = document.querySelector("#imgFile")
                const formData = new FormData();
                formData.append('file0', fileInput.files[0])

                const requestFile = await fetch(Global.url + "publication/upload/" + publicationId, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": token
                    }
                });

                const responseFile = await requestFile.json();
                console.log(responseFile);


                if (responseFile.status === "success") {
                    setIsUpload(true);

                    setUserPublications(prevValues => {
                        prevValues.shift(); //Elimina el primer elemento del array
                        return [responseFile.publication, ...prevValues];
                    })



                    setCounters(prevValues => {
                        return {
                            ...prevValues,
                            publications: prevValues.publications + 1
                        }
                    });

                    setTimeout(() => {
                        setIsUpload(false)
                    }, 1500)
                }
            }
        } else {
            setNoImage(true);

            setTimeout(() => {
                setNoImage(false);
            }, 1500)
        }


    }

    return (
        <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hola, {auth.name}</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {auth.image !== "default.png" ? (
                                <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil" />
                            ) : (
                                <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                            )}
                        </div>

                        <div className="general-info__container-names">
                            <a href="#" className="container-names__name">{auth.name} {auth.surname}</a>
                            <p className="container-names__nickname">{auth.nick}</p>
                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <a href="#" className="following__link">
                                <span className="following__title">Siguiendo</span>
                                <span className="following__number">{counters.following}</span>
                            </a>
                        </div>
                        <div className="stats__following">
                            <a href="#" className="following__link">
                                <span className="following__title">Seguidores</span>
                                <span className="following__number">{counters.followed}</span>
                            </a>
                        </div>


                        <div className="stats__following">
                            <a href="#" className="following__link">
                                <span className="following__title">Publicaciones</span>
                                <span className="following__number">{counters.publications}</span>
                            </a>
                        </div>


                    </div>
                </div>


                <div className="aside__container-form">

                    <form onSubmit={handlePublication} className="container-form__form-post">

                        <div className="form-post__inputs">
                            <label htmlFor="post" className="form-post__label">¿Que estás pesando hoy?</label>
                            <textarea name="post" className="form-post__textarea"></textarea>
                        </div>

                        <div className="form-post__inputs">
                            <label htmlFor="image" className="form-post__label">Sube tu foto</label>
                            <input type="file" id="imgFile" name="image" className="form-post__image" />
                        </div>

                        <input type="submit" value="Enviar" className="form-post__btn-submit" />

                    </form>

                    {isUpload &&
                        <div className='upload success__upload'>
                            <h2>¡Publicación enviada!</h2>
                        </div>
                    }

                    {noImage &&
                        <div className='upload unsuccess__upload'>
                            <h2>¡Faltan campos por completar!</h2>
                        </div>
                    }


                </div>

            </div>

        </aside>
    )
}
