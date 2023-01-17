import React, { useEffect, useState } from 'react'
import { Card } from './Card';
import { Global } from "../../helpers/Global"
import { useAuth } from "../../hooks/useAuth"

export const Feed = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPublications, setTotalPublications] = useState(0);

    const { token } = JSON.parse(localStorage.getItem("token"));
    const { auth, userPublications, setUserPublications, counters, setCounters, deletedItems, setDeletedItems } = useAuth();

    useEffect(() => {
        getUserPublications();
    }, []);

    useEffect(() => {
        getMorePublications();
    }, [page]);


    const getUserPublications = async () => {
        setUserPublications([]);
        console.log("Primera ejecución");

        const request = await fetch(Global.url + "publication/user/" + auth._id + "/" + page, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        });

        const response = await request.json();
        console.log(response);

        if (response.status === "success") {
            setUserPublications(response.publications);
            console.log("feedResponse", response);
            setTotalPages(response.pages);
            setCounters(prevValues => {
                return {
                    ...prevValues,
                    publications: response.total
                }
            });
        }
    };

    const getMorePublications = async () => {

        if (page !== 1) {
            console.log("Más publicaciones 1");
            const request = await fetch(Global.url + "publication/user/" + auth._id + "/" + page, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                }
            });

            const response = await request.json();
            console.log(response);

            if (response.status === "success") {
                if (deletedItems !== 0) {
                    const slicedPublications = response.publications.slice(-deletedItems)
                    setUserPublications(prevValues => {
                        return [...prevValues, ...slicedPublications]
                    })

                    setDeletedItems(0);
                    setTotalPages(response.pages);
                } else {
                    setUserPublications(prevValues => {
                        return [...prevValues, ...response.publications]
                    })
                }
                
            }
        } else if (deletedItems !== 0) {
            console.log("Más publicaciones 2", userPublications);
            const request = await fetch(Global.url + "publication/user/" + auth._id + "/" + page, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                }
            });

            const response = await request.json();
            console.log(response);

            if (response.status === "success") {
                const slicedPublications = response.publications.slice(-deletedItems)
                setUserPublications(prevValues => {
                    return [...prevValues, ...slicedPublications]
                })

                setDeletedItems(0);
                setTotalPages(response.pages);
            }
        }



    }

    const handleChangePage = () => {

        if (deletedItems !== 0) {
            getMorePublications();
        } else {
            setPage(page + 1);
        }

    }


    return (
        <>

            <header className="content__header">
                <h1 className="content__title">Inicio</h1>
                <button className="content__button">Mostrar nuevas</button>
            </header>

            {userPublications.map((publication, index) => {
                return <Card key={index}
                             publication={publication} 
                             setUserPublications={setUserPublications} 
                             />
            })}


            <div className="content__container-btn">
                {totalPages === page ?
                    <button className="content__btn-no-more-post">
                        No hay más publicaciones
                    </button>
                    :
                    <button onClick={handleChangePage} className="content__btn-more-post">
                        Ver mas publicaciones
                    </button>
                }

            </div>

        </>
    )
}
