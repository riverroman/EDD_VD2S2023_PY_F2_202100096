package grafo

import "paquete/Backend/Peticiones"

type Grafo struct {
	Principal *NodoListaAdyacencia
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
		//insertar Fila
		g.insertarFila(curso)
		//insertar Columna
		g.insertarColumna(curso, post)
	} else {
		g.insertarColumna(curso, post)
	}
}

func (g *Grafo) Reporte(nombre string) {
	cadena := ""
	nombre_archivo := "./Reporte/" + nombre + ".dot"
	nombre_imagen := "./Reporte/" + nombre + ".jpg"
	if g.Principal != nil {
		cadena += "digraph grafoDirigido{ \n rankdir=LR; \n node [shape=box]; layout=neato; \n nodo" + g.Principal.Valor + "[label=\"" + g.Principal.Valor + "\"]; \n"
		cadena += "node [shape = ellipse]; \n"
		cadena += g.retornarValoresMatriz()
		cadena += "\n}"
	}
	Peticiones.CrearArchivo(nombre_archivo)
	Peticiones.EscribirArchivo(cadena, nombre_archivo)
	Peticiones.Ejecutar(nombre_imagen, nombre_archivo)
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
