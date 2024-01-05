import React from "react";
import { MdCloudUpload } from "react-icons/md";

export default function Principal_Admin() {
  const uploadFileTutor = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const parsedData = parseCSV(content);
      parsedData.map(async (row) => {
        if (row.length > 1) {
          const response = await fetch(
            "http://localhost:4000/registrar-tutor",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Carnet: parseInt(row[0]),
                Nombre: row[1],
                Curso: row[2],
                Password: row[3],
              }),
            }
          );

          const result = await response.json();
        }
      });
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsText(file);
  };

  const uploadFileAlumno = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const parsedData = parseCSV(content);
      console.log(parsedData);
      parsedData.map(async (row) => {
        if (row.length > 1) {
          const response = await fetch(
            "http://localhost:4000/registrar-alumno",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Carnet: parseInt(row[0]),
                Nombre: row[1],
                Password: row[2],
                Cursos: [row[3], row[4], row[5]],
              }),
            }
          );

          const result = await response.json();
        }
      });
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsText(file);
  };

  const parseCSV = (csvContent) => {
    const rows = csvContent.split("\n");
    const encabezado = rows.slice(1);
    const sinRetorno = encabezado.map((row) => row.trim());
    const data = sinRetorno.map((row) => row.split(","));
    return data;
  };

  const uploadCourses = (e) => {
    var reader = new FileReader();
    reader.onload = async (e) => {
      var obj = JSON.parse(e.target.result);
      console.log(obj);
      const response = await fetch("http://localhost:4000/registrar-cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Cursos: obj.Cursos,
        }),
      });
    };
    reader.readAsText(e.target.files[0]);
  };

  const alumnos = (e) => {
    e.preventDefault();
    window.open("/principal/admin/alumnos", "_self");
  };

  const libros = (e) => {
    e.preventDefault();
    window.open("/principal/admin/libros", "_self");
  };

  const reporte = (e) => {
    e.preventDefault();
    window.open("/principal/admin/reporte", "_self");
  };

  const salir = (e) => {
    e.preventDefault();
    console.log("Listo");
    localStorage.clear();
    window.open("/", "_self");
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <header className="w-full">
        <div className="flex p-4 items-center justify-center gap-2 w-full  bg-white">
          <img className="w-14 h-13" src="https://seeklogo.com/images/U/universidad-de-san-carlos-de-guatemala-logo-4B7C23A157-seeklogo.com.png" alt="usac" />
          <h2 className="font-mono text-2xl tracking-widest">USAC EDD</h2>
        </div>
      </header>
      <div className="flex-grow">
        <nav className="flex text-lg p-6 mt-10 mx-auto max-w-screen-sm space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <a href="#archivos" className="hover:scale-90 transition-all">
            📁 Cargar Archivos
          </a>
          <a onClick={libros} className="hover:scale-90 transition-all">
            📕 Libros
          </a>
          <a href="#reportes" className="hover:scale-90 transition-all">
            📸 Reportes
          </a>
        </nav>
        <div className="flex-grow px-4 text-lg py-4 mt-10 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <p>
            → Nota: Para la carga de Archivos deben de contener un formato en
            especifico y de ser extension .csv a excepción de la carga de Cursos
            ya que se maneja .json
          </p>
        </div>
        <div className="flex-grow px-4 text-lg py-4 mt-10 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
            <h2 className="text-center">
              Zona de Carga de Archivos
            </h2>
        </div>
        <div className="flex text-lg py-3 mt-10 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <div className="flex flex-col items-center">
            <div className="flex space-x-28 ">
              <h2>👨🏼‍🏫 Cargar Tutores</h2>
              <h2>👨🏻‍🎓 Cargar Estudiantes</h2>
              <h2>🗒️ Cargar Cursos</h2>
            </div>
            <div className="flex space-x-10">
              <label
                htmlFor="fileInputTutores"
                className="w-full flex justify-center cursor-pointer"
              >
                <span className="bg-black text-white py-2 px-4 flex justify-center rounded-full">
                  <MdCloudUpload className="text-2xl mr-2 font-mono" />
                  Seleccionar Archivo
                </span>
                <input
                  id="fileInputTutores"
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
                  className="hidden"
                  onChange={uploadFileTutor}
                />
              </label>
              <div></div>
              <label
                htmlFor="fileInputStudent"
                className="w-full flex justify-center cursor-pointer"
              >
                <span className="bg-black text-white py-2 px-4 flex justify-center rounded-full">
                  <MdCloudUpload className="text-2xl mr-2 font-mono" />
                  Seleccionar Archivo
                </span>
                <input
                  id="fileInputStudent"
                  type="file"
                  className="hidden"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-exce"
                  onChange={uploadFileAlumno}
                />
              </label>
              <label
                htmlFor="fileInputCourses"
                className="w-full flex justify-center cursor-pointer"
              >
                <span className="bg-black text-white py-2 px-4 flex justify-center rounded-full">
                  <MdCloudUpload className="text-2xl mr-2 font-mono" />
                  Seleccionar Archivo
                </span>
                <input
                  id="fileInputCourses"
                  type="file"
                  className="hidden"
                  accept="application/json"
                  onChange={uploadCourses}
                />
              </label>
            </div>
          </div>
        </div>
        <div id="reportes" className="flex-grow px-4 text-lg py-4 mt-12 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
            <h2 className="text-center">
              Zona de Reportes
            </h2>
        </div>
        <div className="flex px-4 text-lg py-4 mt-10 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <div>
            <a href="/arbolB" >Reporte Arbol B</a>
          </div>
          <div>
            <a onClick={alumnos} >Reporte Tabla Hash</a>
          </div>
          <div>
            <a href="/arbolMerkle">Reporte de Árbol de Merkle</a>
          </div>
          <div>
            <a href="/grafo">Reporte de Grafo</a>
          </div>
      </div>
      </div>
      <div className="w-full bg-slate-500 flex items-center justify-center p-2 font-mono">
        <a href="/" className="text-xl">← Salir</a>
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-white text-black">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

