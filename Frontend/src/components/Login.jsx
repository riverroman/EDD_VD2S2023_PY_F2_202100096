import { Glow, GlowCapture } from "@codaworks/react-glow";
import * as React from "react";
import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [isStudentChecked, setIsStudentChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const navigate = useNavigate(); 

  const handleTutorCheckboxChange = () => {
    setIsChecked(true);
    setIsStudentChecked(false);
  }

  const handleStudentCheckboxChange = () => {
    setIsStudentChecked(true);
    setIsChecked(false);
  };



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
        Alumno: isStudentChecked,
      }),
    });

    const result = await response.json();
    if (result.rol === 0) {
      swal({
        title: "Error De Credenciales",
        text: "Revise los datos Ingresados",
        icon: "error",
        button: "Aceptar",
        timer: "2000",
      });
    } else if (result.rol === 1) {
      swal({
        title: "Credenciales Correctas",
        text: "Datos Correctos",
        icon: "success",
        button: "Aceptar",
        timer: "3000",
      });
      localStorage.setItem("Tipo", "1");
      localStorage.setItem("user", userName);
      navigate('/admin');
    } else if (result.rol === 2) {
      swal({
        title : "Credenciales Correctas",
        text : "Datos Correctos",
        icon : "success",
        button : "Aceptar",
        timer : "3000",
      })
      localStorage.setItem("Tipo", "2");
      localStorage.setItem("User", userName);
      navigate('/tutor');
    } else if (result.rol === 3) {
      swal({
        title : "Credenciales Correctas",
        text : "Datos Correctos",
        icon : "success",
        button : "Aceptar",
        timer : "3000",
      })
      localStorage.setItem("Tipo", "3");
      localStorage.setItem("User", userName);
      navigate('/estudiante');
      console.log(result);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full bg-white flex items-center justify-center gap-2 py-3 text-black">
        <img
          className="w-14 h-13"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
          alt="usac-logo"
        />
        <h1 className="font-mono text-2xl tracking-widest">USAC - EDD</h1>
      </div>
      <GlowCapture className="flex items-center justify-center flex-grow">
      <Glow>
      <div>
          <form 
            onSubmit={handleSubmit}
            className="mt-8 p-10 bg-white rounded-3xl glow:text-glow"
          >
            <div>
              <h1 className="text-5xl font-semibold text-center mt-2 font-mono ">
                Bienvenido
              </h1>
              <p className="font-medium text-lg text-gray-500 mt-4 text-center font-mono">
                Ingrese sus Datos
              </p>
            </div>
            <div className="mt-8">
              <div className="text-center">
                <label className="text-lg font-medium font-mono">User</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-center font-mono"
                  placeholder="Ingresa tu User"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="text-center">
                <label className="text-lg font-medium font-mono">
                  Password
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-center font-mono"
                  placeholder="Ingresa tu Password"
                  type="password"
                  value={passwordUser}
                  onChange={(e) => setPasswordUser(e.target.value)}
                />
              </div>
              <div className="mt-8 flex justify-center items-center">
                <div className="w-full flex items-center justify-center gap-1.5">
                  <input
                    type="checkbox"
                    id="tutor"
                    checked={isChecked}
                    onChange={handleTutorCheckboxChange}
                  />
                  <label
                    className="font-medium text-base font-mono"
                    htmlFor="tutor"
                  >
                    Tutor
                  </label>
                  <input
                    type="checkbox"
                    id="estudiante"
                    checked={isStudentChecked}
                    onChange={handleStudentCheckboxChange}
                  />
                  <label
                    className="font-medium text-base font-mono"
                    htmlFor="estudiante"
                  >
                    Estudiante
                  </label>
                </div>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <button
                  className="active:scale-[.98] font-mono active:duration-75 transition-all hover:scale-[1.1] ease-in-out w-full bg-violet-500 text-white text-lg font-bold py-4 rounded-xl tracking-wide"
                  type="submit"
                >
                  Ingresar
                </button>
              </div>
            </div>
          </form>
        </div>
        </Glow>
      </GlowCapture>
      <div className="w-full p-3 flex items-center justify-center bg-white text-black">
        <footer>
          <h2 className="font-mono text-1xl">&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}
