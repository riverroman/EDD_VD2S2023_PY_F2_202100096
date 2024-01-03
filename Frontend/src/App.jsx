import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Administrador from './components/Administrador';
import Tutor from './components/Tutor';
import Estudiante from './components/Estudiantes';
import TablaAlumnos from './components/TablaAlumnos';
import "./index.css"

function App() {  
  const [count, setCount] = useState(0);
  return (
    <>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/admin" element = {<Administrador/>}/>
        <Route path="/tutor" element = {<Tutor/>}/>
        <Route path="/estudiante" element = {<Estudiante/>}/>
        <Route path="/tbl-alumnos" element = {<TablaAlumnos/>}/>
      </Routes>
    </>
  );
}

export default App
