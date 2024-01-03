import React, { useState, useEffect } from "react";

function TablaAlumnos() {
  const [alumnosRegistrados, setAlumnosRegistrados] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/tbl-alumnos");
        const result = await response.json();
        setAlumnosRegistrados(result.Arreglo);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="w-full bg-black flex items-center justify-center gap-2 py-3 text-white">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">REPORTE TABLA HASH</h1>
      </div>
      <div className="flex w-full bg-white flex-grow items-center justify-center text-center font-mono">
      <table className="table table-dark w-full">
          <thead>
            <tr>
              <th scope="col" className="p-2">
                No.
              </th>
              <th scope="col" className="p-2">
                Posicion
              </th>
              <th scope="col" className="p-2">
                Carnet
              </th>
              <th scope="col" className="p-2">
                Nombre
              </th>
              <th scope="col" className="p-2">
                Password
              </th>
              <th scope="col" className="p-2">
                Curso 1
              </th>
              <th scope="col" className="p-2">
                Curso 2
              </th>
              <th scope="col" className="p-2">
                Curso 3
              </th>
            </tr>
          </thead>
          <tbody>
            {alumnosRegistrados.map((element, j) => {
              if (element.Id_Cliente != "") {
                return (
                  <tr key={"alum" + j} className="border-b">
                    <th scope="row" className="p-2">
                      {j + 1}
                    </th>
                    <td className="p-2">{element.Llave}</td>
                    <td className="p-2">{element.Persona.Carnet}</td>
                    <td className="p-2">{element.Persona.Nombre}</td>
                    <td className="p-2">{element.Persona.Password}</td>
                    <td className="p-2">{element.Persona.Curso1}</td>
                    <td className="p-2">{element.Persona.Curso2}</td>
                    <td className="p-2">{element.Persona.Curso3}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-black text-white">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

export default TablaAlumnos;
