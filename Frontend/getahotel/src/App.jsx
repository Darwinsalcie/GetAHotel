import {useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
//Estado para guardar los posts
const [posts, setPosts] = useState([]);
//Estado saber si está cargando o no.
const [loading, setLoading] = useState(true);
const rad = 3000;
const lat = 18.4707478;
const lon = -69.9168466;

useEffect( () => {
  axios.get(`https://localhost:7023/api/Hotel/GetHotelsAround?radius=${rad}&lat=${lat}8&lon=${lon}`)
    .then((response) => {
      setPosts(response.data.elements);
      })
      .catch((error) => {
    console.error('Error al obtener posts', error);
  })
  .finally(() => {
    setLoading(false)
  });
  }, []);

  if (loading) return <p>Cargando...</p>

  return (
    <>
      <div>
        <h1>Posts desde Local API</h1>
        <ul>
          {}
          {posts
          .filter(h => h.tags?.name)
          .filter(h => h.tags?.website)
          .map((h) => (
            <li key={h.id}>
              <div >
                <h2>{h.tags.name}</h2>
                <a href={h.tags.website}>{h.tags.website}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </>
  )
}

 //.filter(h => h.tags?.name)
 // Si tags existe devuelve .name
export default App
