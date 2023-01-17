import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import avatar from "../../assets/img/user.png";
import { Global } from '../../helpers/Global';
import { useAuth } from "../../hooks/useAuth";



export const Card = ({ publication, setUserPublications }) => {
    const navigate = useNavigate();

    const { auth, setCounters, setDeletedItems, setAuthProfile } = useAuth();
    const { token } = JSON.parse(localStorage.getItem("token"));
    console.log("PUBLICACION",publication);

    let time = Math.floor((Date.now() - publication.created_at) / 1000);
    let unit = "s"

    if (time > 60) {
        time = Math.floor(time / 60);
        unit = "min"

        if (time > 60) {
            time = Math.floor(time / 60);
            unit = "h"

            if (time > 24) {
                time = Math.floor(time / 60);
                unit = "d"
            }
        }


    }


    const deletePublication = async () => {
        const request = await fetch(Global.url + "publication/remove/" + publication._id, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        });

        const response = await request.json();
        console.log(response);

        if (response.status === "success") {
            setUserPublications(prevValues => {
                return prevValues.filter(item => {
                    return item._id !== publication._id;
                })
            });

            setCounters(prevValues => {
                return {
                    ...prevValues,
                    publications: prevValues.publications - 1
                }
            })

            setDeletedItems(prevValues => prevValues + 1);

            //Eliminar la imagen del sistema

        }
    }


    return (
        <div className="content__posts">

            <div className="posts__post">

                <div className="post__container">

                    <div className="post__image-user">
                        {publication.user.image !== "default.png" ? (
                            <img src={Global.url + "user/avatar/" + publication.user.image} className="container-avatar__img" alt="Foto de perfil" />
                        ) : (
                            <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                        )}
                    </div>

                    <div className="post__body">

                        <div className="post__user-info">
                            <a href="#" className="user-info__name">{publication.user.name}</a>
                            <span className="user-info__divider"> | </span>
                            <a href="#" className="user-info__create-date">Hace {time} {unit}</a>
                        </div>

                        <div className="publication-image">
                            {publication.file &&
                                <img src={Global.url + "publication/media/" + publication.file}
                                    className="container-avatar__img" alt="Foto de perfil"
                                />}

                        </div>

                        <h4 className="post__content">{publication.text}</h4>

                    </div>

                </div>

                {(publication.user._id === auth._id) &&
                    <div className="post__buttons">

                        <button onClick={deletePublication} className="post__button">
                            <i className="fa-solid fa-trash-can"></i>
                        </button>

                    </div>
                }


            </div>
        </div>
    )
}
