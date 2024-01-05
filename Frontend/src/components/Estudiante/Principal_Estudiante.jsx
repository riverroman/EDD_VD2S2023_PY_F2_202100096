import React, { useEffect, useState } from "react";

function Principal_Estudiante() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    async function PedirCursos() {
      const valorLocal = localStorage.getItem("user");
      const response = await fetch("http://localhost:4000/obtener-clases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Carnet: valorLocal,
        }),
      });
      const result = await response.json();
      console.log(result);
      setCursos(result.Arreglo);
    }
    PedirCursos();
  }, []);

  const Palabra = () => {
    return (
      <div className="flex items-center justify-center flex-wrap">
        {cursos.map((item, i) => (
          <div className="flex items-center justify-center p-4" key={"CursoEstudiante" + i}>
            <div className="w-full max-w-screen-sm bg-white p-4 rounded-lg shadow">
              <h1 className="text-center" key={"album" + i} value={i}>
                {item}
              </h1>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const publicaciones = (e) => {
    e.preventDefault();
    localStorage.setItem("cursos", JSON.stringify(cursos));
    window.open("/principal/estudiante/publicacion", "_self");
  };

  const libro = (e) => {
    e.preventDefault();
    localStorage.setItem("cursos", JSON.stringify(cursos));
    window.open("/principal/estudiante/libro", "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="w-full">
        <div className="flex p-4 items-center justify-center gap-2 w-full bg-sky-400 text-black">
          <img className="w-14 h-13" src="https://seeklogo.com/images/U/universidad-de-san-carlos-de-guatemala-logo-4B7C23A157-seeklogo.com.png" alt="usac" />
          <h2 className="font-mono text-2xl tracking-widest">USAC EDD</h2>
        </div>
      </header>
      <div className="flex-grow">
        <nav className="flex text-lg p-6 mt-20 mx-auto max-w-screen-sm space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <a href="/principal/estudiante/publicacion" onCanPlay={publicaciones} className="hover:scale-90 transition-all">
            📁 Publicaciones
          </a>
          <a  onClick={libro} className="hover:scale-90 transition-all">
            📕 Libros
          </a>
        </nav>
        <div className="flex-grow px-4 text-lg py-4 mt-20 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <h2 className="text-center">Mis Cursos</h2>
        </div>
        <div className="flex text-lg p-6 mt-20  mx-auto max-w-screen-sm space-x-20 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          {cursos.length > 0 ? <Palabra /> : null}
        </div>
        <div className="flex-grow px-4 text-lg py-4 mt-20 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <a href="/" className="flex items-center text-xl hover:scale-90 transition-all justify-center">← Regresar</a>
        </div>
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-sky-400 text-black">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

export default Principal_Estudiante;
