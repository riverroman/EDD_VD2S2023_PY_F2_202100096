import React, { useEffect, useState } from "react";

function Libros_Control() {
  const [libros, setLibros] = useState([]);
  const [eleccion, setEleccion] = useState(0);

  useEffect(() => {
    async function PedirLibros() {
      const response = await fetch("http://localhost:4000/enviar-libros-admin");
      const result = await response.json();
      console.log(result);
      if (result.status === 200) {
        setLibros(result.Arreglo);
      }
    }
    PedirLibros();
  }, []);

  const handleChange = (e) => {
    var j = parseInt(e.target.value);
    setEleccion(j);
    console.log(j);
  };

  const LibrosObtenidos = () => {
    console.log(libros);
    return (
      <div>
        <select
          className="form-control"
          aria-label=".form-select-lg example"
          onChange={handleChange}
        >
          <option value={0}>Elegir Libro....</option>
          {libros.map((item, j) => (
            <option value={j} key={j}>
              {item.Nombre}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const LibrosDefault = () => {
    console.log(libros);
    return (
      <div>
        <select
          className="form-control"
          aria-label=".form-select-lg example"
          onChange={handleChange}
        >
          <option value={0}>Elegir Libro....</option>
        </select>
      </div>
    );
  };

  const aceptar = async (e) => {
    e.preventDefault();
    const valorLocal = localStorage.getItem("user");
    if (libros.length > 0) {
      const response = await fetch("http://localhost:4000/registrar-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Accion: "Aceptado",
          Nombre: libros[eleccion].Nombre,
          Tutor: libros[eleccion].Tutor,
          Curso: libros[eleccion].Curso,
        }),
      });

      const result = await response.json();
    }
  };

  const rechazar = async (e) => {
    e.preventDefault();
    const valorLocal = localStorage.getItem("user");
    if (libros.length > 0) {
      const response = await fetch("http://localhost:4000/registrar-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Accion: "Rechazado",
          Nombre: libros[eleccion].Nombre,
          Tutor: libros[eleccion].Tutor,
        }),
      });

      const result = await response.json();
    }
  };

  const finalizar = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/finalizar-libros");
    const result = await response.json();
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <header className="w-full">
        <div className="flex p-4 items-center justify-center gap-2 w-full  bg-white">
          <img className="w-14 h-13" src="https://seeklogo.com/images/U/universidad-de-san-carlos-de-guatemala-logo-4B7C23A157-seeklogo.com.png" alt="usac" />
          <h2 className="font-mono text-2xl tracking-widest">USAC EDD</h2>
        </div>
      </header>
      <div className="flex w-full  flex-grow items-center justify-center text-center font-mono">
      <div className="form-signin1 bg-white p-20 w-1/2">
        <form className="card card-body">
          <h4 className="h3 mb-3 fw-normal">Selecciones un Libro</h4>
          <br />
          <div className="col align-self-center">
            {libros.length > 0 ? <LibrosObtenidos /> : <LibrosDefault />}
          </div>
          <br />
          <div className="row align-items-start">
            <div className="col">
              <center>
                <button
                  className="bg-black w-full text-white p-3 mt-2"
                  onClick={rechazar}
                >
                  Rechazar
                </button>
              </center>
            </div>
            <div className="col">
              <center>
                <button
                  className="bg-black w-full text-white p-3 mt-2"
                  onClick={aceptar}
                >
                  Aceptar
                </button>
              </center>
            </div>
            <div className="col">
              <center>
                <button
                  className="bg-black w-full text-white p-3 mt-2"
                  onClick={finalizar}
                >
                  Finalizar
                </button>
              </center>
            </div>
          </div>
          <br />
        </form>
      </div>
      </div>
    <div className="w-full mt-5 bg-slate-500 flex items-center justify-center p-2 font-mono">
        <a href="/principal/admin" className="text-xl">← Salir</a>
    </div>
    <div className="w-full p-3 flex items-center justify-center bg-white text-black">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

export default Libros_Control;
