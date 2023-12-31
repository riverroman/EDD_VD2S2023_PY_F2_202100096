package main

import (
	"crypto/sha256"
	"encoding/hex"
	arbolb "paquete/Backend/ArbolB"
	peticiones "paquete/Backend/Peticiones"
	tablahash "paquete/Backend/TablaHash"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var tablaAlumnos *tablahash.TablasHash
var listaSimple *arbolb.ListaSimple
var arbolTutor *arbolb.ArbolB

func main() {
	tablaAlumnos = &tablahash.TablasHash{Tabla: make(map[int]tablahash.NodoHash), Capacidad: 7, Utilizacion: 0}
	listaSimple = &arbolb.ListaSimple{Inicio: nil, Longitud: 0}
	arbolTutor = &arbolb.ArbolB{Raiz: nil, Orden: 3}

	app := fiber.New()
	app.Use(cors.New())
	app.Post("/login", Validar)
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
			if tablaAlumnos.Buscar(usuario.UserName, SHA256(usuario.Password)) {
				return c.JSON(&fiber.Map{
					"status":  200,
					"message": "Credenciales Correctas",
					"rol":     3,
				})
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
