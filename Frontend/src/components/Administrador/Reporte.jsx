import React, { useState } from "react";

function Reporte() {
  const [imagen, setImagen] = useState(
    "https://yakurefu.com/wp-content/uploads/2020/02/Chi_by_wallabby.jpg"
  );
  const salir = (e) => {
    e.preventDefault();
    console.log("Listo");
    window.open("/principal/admin", "_self");
  };
  
  const validar = (data) => {
    console.log(data);
    setImagen(data.imagen.Imagenbase64);
  };

  const reporteGrafo = async (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/reporte-grafo", {})
      .then((response) => response.json())
      .then((data) => validar(data));
  };

  const reporteArbol = async (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/reporte-arbol", {})
      .then((response) => response.json())
      .then((data) => validar(data));
  };

  const reporteBlockchain = async (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/reporte-bloque", {})
      .then((response) => response.json())
      .then((data) => validar(data));
  };

  return (
    <div className="form-signin1">
      <div className="text-center">
        <form className="card card-body">
          <h1 className="h3 mb-3 fw-normal">Reportes Administrador</h1>
          <br />
          <center>
            <button
              className="w-50 btn btn-outline-primary"
              onClick={reporteArbol}
            >
              Arbol B
            </button>
          </center>
          <br />
          <center>
            <button
              className="w-50 btn btn-outline-primary"
              onClick={reporteGrafo}
            >
              Grafo
            </button>
          </center>
          <br />
          <center>
            <button
              className="w-50 btn btn-outline-primary"
              onClick={reporteBlockchain}
            >
              Arbol Merkle
            </button>
          </center>
          <br />
          <center>
            <button className="w-50 btn btn-outline-success" onClick={salir}>
              Salir
            </button>
          </center>
          <br />
          <center>
            <img src={imagen} width="350" height="350" alt="some value" />
          </center>
          <br />
          <p className="mt-5 mb-3 text-muted">EDD 201700918</p>
          <br />
        </form>
      </div>
    </div>
  );
}

export default Reporte;
