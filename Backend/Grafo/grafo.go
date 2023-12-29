package grafo

import (
	"encoding/json"
	"log"
	"os"
)

type Grafo struct {
	Principal *NodoListaAdyacencia
}

var matriz = &Grafo{Principal: nil}

type Cursos struct {
	Codigo        string   `json:"Codigo"`
	PostRequisito []string `json:"Post"`
}

type DatosCursos struct {
	Curso []Cursos `json:"Cursos"`
}

func (g *Grafo) LeerJson(ruta string) {
	data, err := os.ReadFile(ruta)
	if err != nil {
		log.Fatal("Error al leer el archivo: ", err)
	}
	var datos DatosCursos
	err = json.Unmarshal(data, &datos)
	if err != nil {
		log.Fatal("Error al asignar el json: ", err)
	}
	for _, curso := range datos.Curso {
		if len(curso.PostRequisito) > 0 {
			for j := 0; j < len(curso.PostRequisito); j++ {
				matriz.InsertarValores(curso.Codigo, curso.PostRequisito[j])
			}
		} else {
			matriz.InsertarValores("ECYS", curso.Codigo)
		}
	}
	matriz.Grafica()
}

func (g *Grafo) insertarColumna(curso string, post string) {
	nuevoNodo := &NodoListaAdyacencia{Valor: post}
	if g.Principal != nil && curso == g.Principal.Valor {
		g.insertarFila(post)
		aux := g.Principal
		for aux.Siguiente != nil {
			aux = aux.Siguiente
		}
		aux.Siguiente = nuevoNodo
	} else {
		g.insertarFila(curso)
		aux := g.Principal
		for aux != nil {
			if aux.Valor == curso {
				break
			}
			aux = aux.Abajo
		}
		if aux != nil {
			for aux.Siguiente != nil {
				aux = aux.Siguiente
			}
			aux.Siguiente = nuevoNodo
		}
	}
}

func (g *Grafo) insertarFila(curso string) {
	nuevoNodo := &NodoListaAdyacencia{Valor: curso}
	if g.Principal == nil {
		g.Principal = nuevoNodo
	} else {
		aux := g.Principal
		for aux.Abajo != nil {
			if aux.Valor == curso {
				return
			}
			aux = aux.Abajo
		}
		aux.Abajo = nuevoNodo
	}
}

func (g *Grafo) InsertarValores(curso string, post string) {
	if g.Principal == nil {
		g.insertarFila(curso)
		g.insertarColumna(curso, post)
	} else {
		g.insertarColumna(curso, post)
	}
}

func (g *Grafo) Grafica() {
	cadena := ""
	nombre_archivo := "./Reportes/Grafo.dot"
	nombre_imagen := "./Reportes/Grafo.jpg"
	if g.Principal != nil {
		cadena += "digraph grafoDirigido{ \n rankdir=LR; \n node [shape=box]; layout=neato; \n nodo" + g.Principal.Valor + "[label=\"" + g.Principal.Valor + "\"]; \n"
		cadena += "node [shape = ellipse]; \n"
		cadena += g.retornarValoresMatriz()
		cadena += "\n}"
	}
	crearArchivo(nombre_archivo)
	escribirArchivo(cadena, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func (g *Grafo) retornarValoresMatriz() string {
	cadena := ""
	aux := g.Principal.Abajo
	aux1 := aux
	for aux != nil {
		for aux1 != nil {
			cadena += "nodo" + aux1.Valor + "[label=\"" + aux1.Valor + "\" ]; \n"
			aux1 = aux1.Siguiente
		}
		if aux != nil {
			aux = aux.Abajo
			aux1 = aux
		}
	}
	aux = g.Principal
	aux1 = aux.Siguiente
	for aux != nil {
		for aux1 != nil {
			cadena += "nodo" + aux.Valor + " -> "
			cadena += "nodo" + aux1.Valor + "[len=1.00]; \n"
			aux1 = aux1.Siguiente
		}
		if aux.Abajo != nil {
			aux = aux.Abajo
			aux1 = aux.Siguiente
		} else {
			aux = aux.Abajo
		}
	}
	return cadena
}
