import React, { useState } from "react";

export default function Grafo() {
  const [imagen, setImagen] = useState("");

  const validar = (data) => {
    console.log(data);
    setImagen(data.imagen.Imagenbase64);
  };

  const reporteGrafo = async (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/reporte-grafo", {})
      .then((response) => response.json())
      .then((data) => validar(data));
      setImagen(data.imagen.Imagenbase64);
  };

return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="w-full bg-black flex items-center justify-center gap-2 py-3 text-white">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">REPORTE GRAFO</h1>
      </div>
      <div className="flex w-full bg-white flex-grow items-center justify-center text-center font-mono">
      <form className="card card-body">
          <center>
            <button
              className="w-50 btn btn-outline-primary mb-5 text-center"
              onClick={reporteGrafo}
            >
              Reporte Grafo
            </button>
          </center>
          <center>
          {imagen && <img src={imagen} width="450"/>}
          </center>
        </form>
      </div>
      <div className="w-full bg-slate-500 flex items-center justify-center p-2 font-mono">
        <a href="/principal/admin" className="text-xl">← Salir</a>
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-black text-white">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

