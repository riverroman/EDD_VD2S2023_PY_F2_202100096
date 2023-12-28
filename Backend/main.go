package main

import (
	"fmt"
	tablahash "paquete/Backend/TablaHash"
)

func main() {
	tablitaHash := tablahash.TablasHash{Tabla: make(map[int]tablahash.NodoHash), Capacidad: 7, Utilizacion: 0}
	tablitaHash.LeerCSV("Estudiantes.csv")
	fmt.Println("Capacidad: ", tablitaHash.Capacidad)
	for i := 0; i < tablitaHash.Capacidad; i++ {
		if usuario, existe := tablitaHash.Tabla[i]; existe {
			fmt.Println("Posicion: ", i, "Carnet: ", "Password: ", usuario.Persona.Password, usuario.Persona.Carnet, "Curso 1: ", usuario.Persona.Curso1, "Curso 2: ", usuario.Persona.Curso2, "Curso 3: ", usuario.Persona.Curso3)
		}
	}

	fmt.Println("---------------------------------------------------")
	for i := 0; i < tablitaHash.Capacidad; i++ {
		if usuario, existe := tablitaHash.Tabla[i]; existe {
			fmt.Println("Llave: ", usuario.Llave, "Carnet", usuario.Persona.Carnet, "Password: ", usuario.Persona.Password, "Curso 1: ", usuario.Persona.Curso1, "Curso 2: ", usuario.Persona.Curso2, "Curso 3: ", usuario.Persona.Curso3)
		}
	}

}
