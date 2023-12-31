package arbolb

import (
	"fmt"
	"strconv"
)

type ArbolB struct {
	Raiz  *RamaB
	Orden int
}

func (a *ArbolB) insertar_rama(nodo *NodoB, rama *RamaB) *NodoB {
	if rama.Hoja {
		rama.Insertar(nodo)
		if rama.Contador == a.Orden {
			return a.dividir(rama)
		} else {
			return nil
		}
	} else {
		temp := rama.Primero
		for temp != nil {
			if nodo.Valor == temp.Valor {
				return nil
			} else if nodo.Valor.Curso < temp.Valor.Curso {
				obj := a.insertar_rama(nodo, temp.Izquierdo)
				if obj != nil {
					rama.Insertar(obj)
					if rama.Contador == a.Orden {
						return a.dividir(rama)
					}
				}
				return nil
			} else if temp.Siguiente == nil {
				obj := a.insertar_rama(nodo, temp.Derecho)
				if obj != nil {
					rama.Insertar(obj)
					if rama.Contador == a.Orden {
						return a.dividir(rama)
					}
				}
				return nil
			}
			temp = temp.Siguiente
		}
	}
	return nil
}

func (a *ArbolB) dividir(rama *RamaB) *NodoB {
	tutor := &Tutores{Carnet: 0, Nombre: "", Curso: "", Password: ""}
	val := &NodoB{Valor: tutor}
	aux := rama.Primero
	rderecha := &RamaB{Primero: nil, Contador: 0, Hoja: true}
	rizquierda := &RamaB{Primero: nil, Contador: 0, Hoja: true}
	contador := 0
	for aux != nil {
		contador++
		if contador < 2 {
			temp := &NodoB{Valor: aux.Valor}
			temp.Izquierdo = aux.Izquierdo
			if contador == 1 {
				temp.Derecho = aux.Siguiente.Izquierdo
			}
			if temp.Derecho != nil && temp.Izquierdo != nil {
				rizquierda.Hoja = false
			}
			rizquierda.Insertar(temp)
		} else if contador == 2 {
			val.Valor = aux.Valor
		} else {
			temp := &NodoB{Valor: aux.Valor}
			temp.Izquierdo = aux.Izquierdo
			temp.Derecho = aux.Derecho
			if temp.Derecho != nil && temp.Izquierdo != nil {
				rderecha.Hoja = false
			}
			rderecha.Insertar(temp)
		}
		aux = aux.Siguiente
	}
	nuevo := &NodoB{Valor: val.Valor}
	nuevo.Derecho = rderecha
	nuevo.Izquierdo = rizquierda

	return nuevo
}

func (a *ArbolB) Insertar(carnet int, nombre string, curso string, password string) {
	tutor := &Tutores{Carnet: carnet, Nombre: nombre, Curso: curso, Password: password}
	nuevoNodo := &NodoB{Valor: tutor}
	if a.Raiz == nil {
		a.Raiz = &RamaB{Primero: nil, Hoja: true, Contador: 0}
		a.Raiz.Insertar(nuevoNodo)
	} else {
		obj := a.insertar_rama(nuevoNodo, a.Raiz)
		if obj != nil {
			a.Raiz = &RamaB{Primero: nil, Hoja: true, Contador: 0}
			a.Raiz.Insertar(obj)
			a.Raiz.Hoja = false
		}
	}
}

func (a *ArbolB) Graficar() {
	cadena := ""
	nombre_archivo := "./Reportes/" + "ArbolB" + ".dot"
	nombre_imagen := "./Reportes/ArbolB" + ".jpg"
	if a.Raiz != nil {
		cadena += "digraph arbol { \nnode[shape=record]\n"
		cadena += a.grafo(a.Raiz.Primero)
		cadena += a.conexionRamas(a.Raiz.Primero)
		cadena += "}"
	}
	crearArchivo(nombre_archivo)
	escribirArchivo(cadena, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func (a *ArbolB) grafo(rama *NodoB) string {
	dot := ""
	if rama != nil {
		dot += a.grafoRamas(rama)
		aux := rama
		for aux != nil {
			if aux.Izquierdo != nil {
				dot += a.grafo(aux.Izquierdo.Primero)
			}
			if aux.Siguiente == nil {
				if aux.Derecho != nil {
					dot += a.grafo(aux.Derecho.Primero)
				}
			}
			aux = aux.Siguiente
		}
	}
	return dot
}

func (a *ArbolB) grafoRamas(rama *NodoB) string {
	dot := ""
	if rama != nil {
		aux := rama
		dot = dot + "R" + rama.Valor.Curso + "[label=\""
		r := 1
		for aux != nil {
			if aux.Izquierdo != nil {
				dot = dot + "<C" + strconv.Itoa(r) + ">|"
				r++
			}
			if aux.Siguiente != nil {
				dot = dot + aux.Valor.Curso + "|"
			} else {
				dot = dot + aux.Valor.Curso
				if aux.Derecho != nil {
					dot = dot + "|<C" + strconv.Itoa(r) + ">"
				}
			}
			aux = aux.Siguiente
		}
		dot = dot + "\"];\n"
	}
	return dot
}

func (a *ArbolB) conexionRamas(rama *NodoB) string {
	dot := ""
	if rama != nil {
		aux := rama
		actual := "R" + rama.Valor.Curso
		r := 1
		for aux != nil {
			if aux.Izquierdo != nil {
				dot += actual + ":C" + strconv.Itoa(r) + " -> " + "R" + aux.Izquierdo.Primero.Valor.Curso + ";\n"
				r++
				dot += a.conexionRamas(aux.Izquierdo.Primero)
			}
			if aux.Siguiente == nil {
				if aux.Derecho != nil {
					dot += actual + ":C" + strconv.Itoa(r) + " -> " + "R" + aux.Derecho.Primero.Valor.Curso + ";\n"
					r++
					dot += a.conexionRamas(aux.Derecho.Primero)
				}
			}
			aux = aux.Siguiente
		}
	}
	return dot
}

func (a *ArbolB) Buscar(numero string, listaSimple *ListaSimple) {
	valTemp, _ := strconv.Atoi(numero)
	a.buscarArbol(a.Raiz.Primero, valTemp, listaSimple)
	if listaSimple.Longitud > 0 {
		fmt.Println("Se enconto el elemento: ", listaSimple.Longitud)
	} else {
		fmt.Println("No se encontro")
	}
}

func (a *ArbolB) buscarArbol(raiz *NodoB, numero int, listaSimple *ListaSimple) {
	if raiz != nil {
		aux := raiz
		for aux != nil {
			if aux.Izquierdo != nil {
				a.buscarArbol(aux.Izquierdo.Primero, numero, listaSimple)
			}
			if aux.Valor.Carnet == numero {
				listaSimple.Insertar(aux)
			}
			if aux.Siguiente == nil {
				if aux.Derecho != nil {
					a.buscarArbol(aux.Derecho.Primero, numero, listaSimple)
				}
			}
			aux = aux.Siguiente
		}
	}
}
