package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	arbolb "paquete/Backend/ArbolB"
	grafo "paquete/Backend/Grafo"
	peticiones "paquete/Backend/Peticiones"
	tablahash "paquete/Backend/TablaHash"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var tablaAlumnos *tablahash.TablasHash
var listaSimple *arbolb.ListaSimple
var arbolTutor *arbolb.ArbolB
var grafoCursos *grafo.Grafo

func main() {
	tablaAlumnos = &tablahash.TablasHash{Tabla: make(map[int]tablahash.NodoHash), Capacidad: 7, Utilizacion: 0}
	listaSimple = &arbolb.ListaSimple{Inicio: nil, Longitud: 0}
	arbolTutor = &arbolb.ArbolB{Raiz: nil, Orden: 3}
	grafoCursos = &grafo.Grafo{Principal: &grafo.NodoListaAdyacencia{Valor: "ECYS"}}

	app := fiber.New()
	app.Use(cors.New())
	app.Post("/login", Validar)
	app.Post("/tutor", registrarTutor)
	app.Post("/estudiante", registrarEstudiantes)
	app.Post("/cursos", registrarCursos)
	app.Get("/tbl-alumnos", TablaAlumnos)
	app.Listen(":4000")
}

func Validar(c *fiber.Ctx) error {
	var usuario peticiones.PeticionLogin
	listaSimple = &arbolb.ListaSimple{Inicio: nil, Longitud: 0}
	c.BodyParser(&usuario)
	if usuario.UserName == "ADMIN_202100096" {
		if usuario.Password == "Admin" {
			return c.JSON(&fiber.Map{
				"status":  200,
				"message": "Credenciales Correctas",
				"rol":     1,
			})
		}
	} else {
		if usuario.Tutor {
			arbolTutor.Buscar(usuario.UserName, listaSimple)
			if listaSimple.Longitud > 0 {
				if listaSimple.Inicio.Tutor.Valor.Password == SHA256(usuario.Password) {
					return c.JSON(&fiber.Map{
						"status":  200,
						"message": "Credenciales Correctas",
						"rol":     2,
					})
				}
			}
		} else {
			if usuario.Alumno {
				if tablaAlumnos.Buscar(usuario.UserName, SHA256(usuario.Password)) {
					return c.JSON(&fiber.Map{
						"status":  200,
						"message": "Credenciales Correctas",
						"rol":     3,
					})
				}
			}
		}
	}
	return c.JSON(&fiber.Map{
		"status":  200,
		"message": "Credenciales Incorrectas",
		"rol":     0,
	})
}

func SHA256(cadena string) string {
	hexaString := ""
	h := sha256.New()
	h.Write([]byte(cadena))
	hexaString = hex.EncodeToString(h.Sum(nil))
	return hexaString
}

func registrarTutor(c *fiber.Ctx) error {
	var tutor peticiones.PeticionRegistroTutor
	c.BodyParser(&tutor)
	arbolTutor.Insertar(tutor.Carnet, tutor.Nombre, tutor.Curso, SHA256(tutor.Password))
	arbolTutor.Graficar()
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

func registrarEstudiantes(c *fiber.Ctx) error {
	var estudiante peticiones.PeticionRegistroAlumno
	c.BodyParser(&estudiante)
	fmt.Println(estudiante)
	tablaAlumnos.Insertar(estudiante.Carnet, estudiante.Nombre, SHA256(estudiante.Password), estudiante.Curso1, estudiante.Curso2, estudiante.Curso3)
	return c.JSON(&fiber.Map{
		"status":  200,
		"Arreglo": tablaAlumnos.ConvertirArreglo(),
	})
}

func registrarCursos(c *fiber.Ctx) error {
	var cursos peticiones.PeticionCursos
	c.BodyParser(&cursos)
	fmt.Println(cursos)
	for _, curso := range cursos.Cursos {
		if len(curso.Post) > 0 {
			for j := 0; j < len(curso.Post); j++ {
				grafoCursos.InsertarValores(curso.Codigo, curso.Post[j])
			}
		} else {
			grafoCursos.InsertarValores("ECYS", curso.Codigo)
		}
	}
	grafoCursos.Grafica()
	return c.JSON(&fiber.Map{
		"status": 200,
	})
}

func TablaAlumnos(c *fiber.Ctx) error {
	return c.JSON(&fiber.Map{
		"status":  200,
		"Arreglo": tablaAlumnos.ConvertirArreglo(),
	})
}
