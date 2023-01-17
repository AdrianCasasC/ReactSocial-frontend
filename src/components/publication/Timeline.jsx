import React, { useEffect, useState } from 'react'
import { Card } from './Card';
import { Global } from "../../helpers/Global"

export const Timeline = () => {
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getListPublications();
    }, [page]);

    const getListPublications = async () => {


        const request = await fetch(Global.url + "publication/feed/" + page, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        });

        const response = await request.json();
        console.log((response));

        if (response.status === "success") {
            setPublications(prevValues => {
                return [...prevValues, ...response.publications]
            });
            console.log("arrayTimeline", publications);
            console.log("Total pags", response);
            setTotalPages(response.pages);
        }
    }


    return (
        <>

            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button">Mostrar nuevas</button>
            </header>

            {publications.map((publication, index) => {
                return <Card key={index} publication={publication} />
            })}


            <div className="content__container-btn">
                {totalPages === page || totalPages < page ?
                    <button className="content__btn-no-more-post">
                        No hay más publicaciones
                    </button>
                    :
                    <button onClick={() => setPage(page + 1)} className="content__btn-more-post">
                        Ver mas publicaciones
                    </button>
                }

            </div>

        </>
    )
}
