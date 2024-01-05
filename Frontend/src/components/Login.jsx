import React, { useState } from "react";
import swal from "sweetalert";

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: userName,
        Password: passwordUser,
        Tutor: isChecked,
      }),
    });

    const result = await response.json();
    if (result.rol == 0) {
      swal({
        title: "Error De Credenciales",
        text: "Revise los datos Ingresados",
        icon: "error",
        button: "Aceptar",
        timer: "2000",
      });
    } else if (result.rol == 1) {
      swal({
        title: "Credenciales Correctas",
        text: "Datos Correctos",
        icon: "success",
        button: "Aceptar",
        timer: "3000",
      }); 
      window.open("/principal/admin", "_self");
      localStorage.setItem("Tipo", "1");
      localStorage.setItem("user", userName);
    } else if (result.rol == 2) {
      window.open("/principal/tutor", "_self");
      localStorage.setItem("Tipo", "2");
      localStorage.setItem("user", userName);
    } else if (result.rol == 3) {
      window.open("/principal/estudiante", "_self");
      localStorage.setItem("Tipo", "3");
      localStorage.setItem("user", userName);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <header className="w-full">
        <div className="flex p-4 items-center justify-center gap-2 w-full  bg-white">
          <img className="w-14 h-13" src="https://seeklogo.com/images/U/universidad-de-san-carlos-de-guatemala-logo-4B7C23A157-seeklogo.com.png" alt="usac" />
          <h2 className="font-mono text-2xl tracking-widest">USAC EDD</h2>
        </div>
      </header>
      <div className="flex items-center justify-center flex-grow">
        <form onSubmit={handleSubmit} className="mt-8 p-10 bg-white rounded-3xl">
          <div>
            <h1 className="text-2xl font-semibold text-center mt-2 font-mono">
              Iniciar Sesion
            </h1>
          </div>
          <div className="mt-8">
            <div className="text-center">
              <label className="text-lg font-medium font-mono">Usuario</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-center font-mono"
                placeholder="Usuario"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="text-center mt-4">
              <label className="text-lg font-medium font-mono">Contraseña</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-center font-mono"
                placeholder="Password"
                type="password"
                value={passwordUser}
                onChange={(e) => setPasswordUser(e.target.value)}
              />
            </div>
            <div className="mt-8 flex justify-center items-center">
              <div className="w-full flex items-center justify-center gap-1.5">
                <input
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(!isChecked)}
                />
                <label
                  className="font-medium text-base font-mono"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Tutor
                </label>
              </div>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <button
                className="w-full hover:scale-90 transition-all bg-violet-500 font-mono text-white text-lg font-bold py-4 rounded-xl tracking-wide"
                type="submit"
              >
                Iniciar Sesion
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full p-3 flex items-center justify-center bg-white text-black">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
  
}

export default Login;
