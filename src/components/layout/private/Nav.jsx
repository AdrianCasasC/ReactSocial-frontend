import React from 'react';
import { NavLink } from 'react-router-dom';
import avatar from "../../../assets/img/user.png";
import { useAuth } from '../../../hooks/useAuth';
import { Global } from "../../../helpers/Global"

export const Nav = () => {
    const {auth} = useAuth();

    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/social/inicio" className="menu-list__link">
                        <i className="fa-solid fa-house"></i>
                        <span className="menu-list__title">Inicio</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/timeline" className="menu-list__link">
                        <i className="fa-solid fa-list"></i>
                        <span className="menu-list__title">Timeline</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/social/gente" className="menu-list__link">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">Gente</span>
                    </NavLink>
                </li>

            </ul>

            <ul className="container-lists__list-end">
                <li className="list-end__item">
                    {auth.image !== "default.png" ? (
                        <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img nav-image" alt="Foto de perfil" />
                    ) : (
                        <img src={avatar} className="container-avatar__img nav-image" alt="Foto de perfil" />
                    )}
                </li>
                
                <li className="list-end__item">
                    <NavLink to="/social/ajustes" className="list-end__link">
                        <i className='fa-solid fa-gear'></i>
                        <span className="list-end__name">Ajustes</span>

                    </NavLink>
                </li>
                <li className="list-end__item">
                    <NavLink to="/social/logout" className="list-end__link">
                        <i className='fa-solid fa-arrow-right-from-bracket'></i>
                        <span className="list-end__name">Cerrar sesión</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}
