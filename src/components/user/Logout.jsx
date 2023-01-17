import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Logout = () => {
    const navigate = useNavigate();
    const { setAuth, setCounters } = useAuth();

    useEffect(() => {
        localStorage.removeItem("token")

        setAuth({});
        setCounters({});

        navigate("/login");
    }, []);

  return (
    <div>Cerrando sesión...</div>
  )
}
