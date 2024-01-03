import * as React from "react";
import { MdCloudUpload } from "react-icons/md";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Administrador() {
  const navigate = useNavigate();
  const uploadFileStudent = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const content = event.target.result;
      const parsedData = parseCSV(content);

      for (const row of parsedData) {
        if (row.length > 1) {
          try {
            const response = await fetch("http://localhost:4000/estudiante", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Carnet: parseInt(row[0]),
                Nombre: row[1],
                Password: row[2],
                Curso1: row[3],
                Curso2: row[4],
                Curso3: row[5],
              }),
            });
            const result = await response.json();
            swal("Éxito", "Estudiantes cargado exitosamente", "success");
          } catch (error) {
            console.error("Error al cargar estudiante:", error);
            swal("Error", "Hubo un problema al cargar el estudiante", "error");
          }
        }
      }
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo: ", error);
    };

    reader.readAsText(file);
  };

  const uploadFileTutor = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const content = event.target.result;
      const parsedData = parseCSV(content);

      for (const row of parsedData) {
        if (row.length > 1) {
          try {
            const response = await fetch("http://localhost:4000/tutor", {
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
            });
            const result = await response.json();
            swal("Éxito", "Tutores cargado exitosamente", "success");
          } catch (error) {
            console.error("Error al cargar tutor:", error);
            swal("Error", "Hubo un problema al cargar el tutor", "error");
          }
        }
      }
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    reader.readAsText(file);
  };

  const uploadFileCourses = async (e) => {
    var file = new FileReader();
    file.onload = async (e) => {
      try {
        var obj = JSON.parse(e.target.result);
        console.log(obj);
        const response = await fetch("http://localhost:4000/cursos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Cursos: obj.Cursos,
          }),
        });
        if (response.ok) {
          swal("Éxito", "Cursos cargados exitosamente", "success");
        } else {
          swal("Error", "Hubo un problema al cargar los cursos", "error");
        }
      } catch (error) {
        console.error("Error al cargar cursos:", error);
        swal("Error", "Hubo un problema al cargar los cursos", "error");
      }
    };
    file.readAsText(e.target.files[0]);
  };

  const parseCSV = (csvContent) => {
    const rows = csvContent.split("\n");
    const encabezado = rows.slice(1);
    const sinRetorno = encabezado.map((row) => row.trim());
    const data = sinRetorno.map((row) => row.split(","));
    return data;
  };

  const salir = (e) => {
    e.preventDefault();
    console.log("Listo");
    navigate("/");
  };

  return (
    <div className="flex flex-col max-h-screen">
      <header className="w-full bg-white flex items-center justify-center gap-2 py-3 text-black">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">USAC - EDD</h1>
      </header>
      <div className="flex-grow">
        <nav className="flex text-lg py-3 mt-20 mx-auto max-w-screen-sm space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <a href="#archivos" className="hover:scale-90 transition-all">
            📁 Cargar Archivos
          </a>
          <a href="#libros" className="hover:scale-90 transition-all">
            📕 Libros
          </a>
          <a href="#reportes" className="hover:scale-90 transition-all">
            📸 Reportes
          </a>
        </nav>
        <div
          id="reportes"
          className="flex m-10 items-center justify-center px-4 text-lg py-4 mx-auto w-full bg-white"
        >
          <h2 className="font-mono"> 🗂️ Carga Archivos</h2>
        </div>
        <div className="flex px-4 text-lg py-4 mt-20 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <p>
            → Nota: Para la carga de Archivos deben de contener un formato en
            especifico y de ser extension .csv a excepción de la carga de Cursos
            ya que se maneja .json
          </p>
        </div>
        <div className="flex text-lg py-3 mt-20 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <div className="flex flex-col items-center">
            <div className="flex space-x-28 ">
              <h2>👨🏼‍🏫 Cargar Tutores</h2>
              <h2>👨🏻‍🎓 Cargar Estudiantes</h2>
              <h2>🗒️ Cargar Cursos</h2>
            </div>
            <div className="flex space-x-2">
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
                  onChange={uploadFileStudent}
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
                  onChange={uploadFileCourses}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div
        id="libros"
        className="flex m-20 px-4 text-lg py-4 mx-auto w-full bg-white"
      ></div>

      <div
        id="reportes"
        className="flex m-10 items-center justify-center px-4 text-lg py-4 mx-auto w-full bg-white"
      >
        <h1 className="font-mono">📸 Reportes</h1>
      </div>

      <div className="flex px-4 text-lg py-4 mt-10 mx-auto max-w-screen-xl space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <div>
            <h2>Reporte Arbol B</h2>
          </div>
          <div>
            <a href="/tbl-alumnos">Reporte Tabla Hash</a>
          </div>
          <div>
            <h2>Reporte de Árbol de Merkle</h2>
          </div>
          <div>
            <h2>Reporte de Grafo</h2>
          </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={salir}
          className="bg-slate-600 text-white border mb-5 mx-4 p-2 font-mono hover:scale-x-90"
        >
          Cerrar Sesion
        </button>
      </div>
      <footer className="w-full p-3 flex items-center justify-center bg-white text-black">
        <div>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </div>
      </footer>
    </div>
  );
}
