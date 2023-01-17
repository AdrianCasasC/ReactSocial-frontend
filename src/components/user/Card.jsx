import React, { useEffect, useState } from 'react';
import avatar from "../../assets/img/user.png";
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';
//import { useAuth } from '../../hooks/useAuth';

export const Card = ({ user }) => {
    const { counters , setCounters } = useAuth();
    const { token } = JSON.parse(localStorage.getItem("token"));
    const [follows, setFollows] = useState({
        follower: false,
        following: false
    })

    useEffect(() => {
        getFollows();
    }, []);

    const getFollows = async () => {
        const request = await fetch(Global.url + "follow/following/" + user._id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        });

        const response = await request.json();
        console.log(response);

        response.user_follow_me.forEach(followerId => {
            if (user._id === followerId) {
                setFollows({
                    ...follows,
                    follower: true
                })
            }
        });

        response.user_following.forEach(followingId => {
            if (user._id === followingId) {
                setFollows({
                    ...follows,
                    following: true
                })
            }
        });
    };

    const handleFollow = async () => {

        const request = await fetch(Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({
                followed: user._id
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": token

            }
        });

        const response = await request.json();
        console.log(response);

        if (response.status === "success") {
            setFollows(prevValues => {
                return {
                    ...prevValues,
                    following: true
                }
            })
            
            //Se setea el nuevo valor de contador para que se refleje inmediatamente en el componente
            setCounters(prevValues => {
                return {
                    ...prevValues,
                    following: prevValues.following + 1
                }
            });
        }
    };

    const handleUnfollow = async() => {
        const { token } = JSON.parse(localStorage.getItem("token"));

        const request = await fetch(Global.url + "follow/unfollow/" + user._id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        });

        const response = await request.json();
        console.log(response);

        if (response.status === "success") {
            setFollows(prevValues => {
                return {
                    ...prevValues,
                    following: false
                }
            });

            //Se setea el nuevo valor de contador para que se refleje inmediatamente en el componente
            setCounters(prevValues => {
                return {
                    ...prevValues,
                    following: prevValues.following - 1
                }
            });
        }
    }

    return (
        <div className="content__posts">

            <div className="posts__post">

                <div className="post__container">

                    <div className="post__image-user">
                        <a href="#" className="post__image-link">
                            {user.image !== "default.png" ?
                                <img src={Global.url + "user/avatar/" + user.image} className="container-avatar__img" alt="Foto de perfil" />
                                :
                                <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                            }

                        </a>
                    </div>

                    <div className="post__body">

                        <div className="post__user-info">
                            <a href="#" className="user-info__name">{user.name} {user.surname}</a>
                            {/*<span className="user-info__divider"> | </span>
                   <a href="#" className="user-info__create-date">Hace 1 hora</a> */}
                        </div>

                        <h4 className="post__content">{user.bio}</h4>

                    </div>

                </div>


                <div className="post__buttons">
                    {follows.following ?
                        <button className='unfollow' onClick={handleUnfollow}>Dejar de seguir</button>
                        :
                        <button className={follows.follower ? "follow__too" : "follow"} 
                                onClick={handleFollow}>{follows.follower ? "Seguir también" : "Seguir"}
                        </button>
                    }

                </div>

            </div>
        </div>
    )
}
