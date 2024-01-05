import React, { useState, useEffect } from "react";

function Cursos_Estudiante() {
  const [cursos, setCursos] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    async function PedirCursos() {
      const arregloCursos = localStorage.getItem("cursos");
      const cursosArreglo = JSON.parse(arregloCursos);
      const response = await fetch(
        "http://localhost:4000/obtener-libros-alumno"
      );
      const result = await response.json();
      console.log(result);
      setCursos(cursosArreglo);
      if (result.status === 200) {
        setLibros(result.Arreglo);
      }
    }
    PedirCursos();
  }, []);

  const Palabra = () => {
    return (
      <div className="row">
        <div className="row align-items-start">
          {cursos.map((item, i) => (
            <div className="form-signin1 col" key={"CursoEstudiante" + i}>
              <div className="text-center">
                <div className="card card-body">
                  <h1 className="text-center bg-sky-400 p-3 font-mono" key={"album" + i} value={i}>
                    {item}
                  </h1>
                  <div>
                    <span
                      className="input-group-text "
                      id="validationTooltipUsernamePrepend"
                    ></span>{" "}
                    <br />
                    {libros.map((ite, j) => {
                      if (ite.Curso === item) {
                        return (
                          <div key={"p-" + i}>
                            <label className="input-group-text" key={"lib" + j}>
                              {ite.Nombre}
                            </label>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (

    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="w-full bg-black flex items-center justify-center gap-2 py-3 text-white">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">Libros Disponibles</h1>
      </div>

      <div className="flex w-full  flex-grow items-center justify-center text-center font-mono">
      <div className="form-signin1">
      <div className="text-center">
          <h1 className="mb-10 bg-black text-white p-3">Libros</h1>
          {cursos.length > 0 ? <Palabra /> : null}
      </div>
    </div>
      </div>
      <div className="w-full mt-5 bg-slate-500 flex items-center justify-center p-2 font-mono">
        <a href="/principal/estudiante" className="text-xl">← Salir</a>
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-black text-white">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}
export default Cursos_Estudiante;
