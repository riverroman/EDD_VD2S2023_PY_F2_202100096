import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Administrador from './components/Administrador';
import "./index.css"

function App() {  
  const [count, setCount] = useState(0);
  return (
    <>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/admin" element = {<Administrador/>}/>
      </Routes>
    </>
  );
}

export default App
