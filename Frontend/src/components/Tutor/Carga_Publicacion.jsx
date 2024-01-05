import React, { useState } from "react";

function Carga_Publicacion() {
  const [contenidoPublicacion, setContenidoPublicacion] = useState("");
  const CargarPublicacionTutor = async (e) => {
    e.preventDefault();
    const valorLocal = localStorage.getItem("user");
    const response = await fetch(
      "http://localhost:4000/registrar-publicacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Carnet: parseInt(valorLocal),
          Nombre: valorLocal,
          Contenido: contenidoPublicacion,
        }),
      }
    );

    const result = await response.json();
  };

return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="w-full bg-black flex items-center justify-center gap-2 py-3 text-white">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">Publicacion</h1>
      </div>
      <div className="flex w-full  flex-grow items-center justify-center text-center font-mono">
      <div className="form-signin1">
        <div className="text-center">
        <form className="card card-body">
          <br />
          <center>
            <h2 className="w-50 btn btn-outline-primary">
              Realizar Publicacion
            </h2>
          </center>
          <br />
          <div className="input-group mb-3">
            <div className="col align-self-center">
              <textarea
                className="border flex text-center"
                name="textarea"
                rows="10"
                cols="50"
                value={contenidoPublicacion}
                onChange={(e) => setContenidoPublicacion(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="mb-3 fw-normal">
            <center>
              <button
                className="mt-4 bg-sky-400 p-3 border font-mono text-l rounded-xl hover:scale-90 transition-all"
                onClick={CargarPublicacionTutor}
              >
                Publicar
              </button>
            </center>
          </div>
        </form>
      </div>
      </div>
    </div>
    <div className="w-full mt-5 bg-slate-500 flex items-center justify-center p-2 font-mono">
        <a href="/principal/tutor" className="text-xl">← Salir</a>
      </div>
    <div className="w-full p-3 flex items-center justify-center bg-black text-white">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

export default Carga_Publicacion;
