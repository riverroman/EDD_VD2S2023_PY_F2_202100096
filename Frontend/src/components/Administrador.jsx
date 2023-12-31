import * as React from "react";

export default function Administrador() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-white flex items-center justify-center gap-2 py-3 text-black">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">USAC - EDD</h1>
      </header>
      <div className="flex-grow">
      <nav className="flex text-lg py-3 mt-10 mx-auto max-w-screen-sm space-x-10 rounded-2xl items-center justify-center cursor-pointer text-black font-mono bg-white">
          <a href="#archivos" className="hover:scale-90 transition-all">Cargar Archivos</a>
          <a href="#archivos" className="hover:scale-90 transition-all">Libros</a>
          <a href="#archivos" className="hover:scale-90 transition-all">Reportes</a>
        </nav>
        <body>
          <div id="#archivos" className="text-white flex-grow">
            <h2>Holaaa</h2>
          </div>
        </body>
      </div>
      <footer className="w-full p-3 flex items-center justify-center bg-white text-black">
        <div>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </div>
      </footer>
    </div>
  );
}
