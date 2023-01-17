import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { Card } from './Card';

export const People = () => {

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { token } = JSON.parse(localStorage.getItem("token"));
  const [foundUsers, setFoundUsers] = useState([]);
  const [response, setResponse] = useState({});

  useEffect(() => {
    getAllPeople()
  }, [page]);

  const getAllPeople = async () => {
    const request = await fetch(Global.url + "user/list/" + page, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      }
    });

    const response = await request.json();
    console.log(response);

    if (response.status === "success") {
      setFoundUsers(response.users);
      setTotalPages(response.pages);
      setResponse(response);
      
    }

    

  };


  return (
    <div>
      {foundUsers.map(user => {

        return <Card key={user._id} user={user} />

      })}

      <div>
        <p>página {page}/{response.pages}</p>

        {/* Condiciones para mostrar los botones según el número de páginas */}
        {page === 1 ? 
        <button onClick={() => setPage(page+1)}>+</button>
        : (
          page === totalPages ?
          <button onClick={() => setPage(page-1)}>-</button>
          : (
            <>
              <button onClick={() => setPage(page-1)}>-</button>
              <button onClick={() => setPage(page+1)}>+</button>
            </> 
            )  
          )
        }
      </div>
    </div>
  )
}
