import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

function Cargar_Libro() {
  const [contenidoPDF, setContenidoPDF] = useState("");
  const uploadFileBook = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const content = event.target.result;
      console.log(content);
      setContenidoPDF(content);
      const valorLocal = localStorage.getItem("user");
      const response = await fetch("http://localhost:4000/registrar-libro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Carnet: parseInt(valorLocal),
          Nombre: file.name,
          Contenido: content,
        }),
      });

      const result = await response.json();
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsDataURL(file);
  };
  
  const hacerpubli = (e) => {
    e.preventDefault();
    console.log("Listo");
    window.open("/principal/tutor/publicacion", "_self");
  }
  
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="w-full bg-black flex items-center justify-center gap-2 py-3 text-white">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">LIBROS</h1>
      </div>
      <div className="w-full mt-3 bg-sky-400 flex items-center justify-center p-3 cursor-pointer">
        <h2 onClick={hacerpubli} className="font-mono" >Realizar Publicacion</h2>
      </div>
      <div className="flex w-full bg-white flex-grow items-center justify-center text-center font-mono">
            <div className="card card-body">
              <h4 className="mt-4">Subir Libro:</h4>
              <br />
              <div className="input-group mb-3">

              <label
                htmlFor="fileBooks"
                className="w-full flex justify-center cursor-pointer"
              >
                <span className="bg-black text-white py-2 px-4 flex justify-center rounded-full">
                  <MdCloudUpload className="text-2xl mr-2 font-mono" />
                  Seleccionar Archivo
                </span>
                <input
                  id="fileBooks"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={uploadFileBook}
                />
              </label>
              </div>
              <div className="m-4 fw-normal ">
                <iframe className="rounded-xl" src={contenidoPDF} width="800" height="800" />
              </div>
            </div>
      </div>
      <div className="w-full mt-5 bg-slate-500 flex items-center justify-center p-2 font-mono">
        <a href="/" className="text-xl">← Salir</a>
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-black text-white">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

export default Cargar_Libro;
