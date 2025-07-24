import { useState } from 'react'
import { Sidebar } from './Sidebar'
//import HotelCardList from './HotelCardList'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Sidebar></Sidebar>
      </div>

    </>
  )
}

export default App
