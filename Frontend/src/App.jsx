import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Libros_Control from "./components/Administrador/Libros_Control";
import Tabla_Alumnos from "./components/Administrador/Tabla_Alumnos";
import Cargar_Libro from "./components/Tutor/Cargar_Libro";
import Carga_Publicacion from "./components/Tutor/Carga_Publicacion";
import Principal_Estudiante from "./components/Estudiante/Principal_Estudiante";
import Reporte from "./components/Administrador/Reporte";
import Cursos_Estudiante from "./components/Estudiante/Cursos_Estudiante";
import Publicacion_Estudiante from "./components/Estudiante/Publicacion_Estudiante";
import ArbolB from "./components/Administrador/ArbolB";
import Grafo from "./components/Administrador/Grafo";
import Principal_Admin from "./components/Administrador/Principal_Admin";
import ArbolMerkle from "./components/Administrador/ArbolMerkle";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/principal/admin" element={<Principal_Admin/>} />
        <Route path="/principal/admin/libros" element={<Libros_Control/>} />
        <Route path="/principal/admin/alumnos" element={<Tabla_Alumnos />} />
        <Route path="/principal/admin/reporte" element={<Reporte />} />
        <Route path="/principal/tutor" element={<Cargar_Libro />} />
        <Route path="/principal/tutor/publicacion"element={<Carga_Publicacion />}/>
        <Route path="/principal/estudiante" element={<Principal_Estudiante />}/>
        <Route path="/principal/estudiante/libro" element={<Cursos_Estudiante />}/>
        <Route path="/principal/estudiante/publicacion" element={<Publicacion_Estudiante />}/>
        <Route path="/arbolB" element={<ArbolB/>}/>
        <Route path="/grafo" element={<Grafo/>}/>
        <Route path="/arbolMerkle" element={<ArbolMerkle/>}/>
      </Routes>
    </>
  );
}

export default App;
