package arbolb

type RamaB struct {
	Primero  *NodoB
	Hoja     bool
	Contador int
}

func (r *RamaB) Insertar(nuevoNodo *NodoB) {
	if r.Primero == nil {
		r.Primero = nuevoNodo
		r.Contador += 1
	} else {
		if nuevoNodo.Valor < r.Primero.Valor {
			nuevoNodo.Siguiente = r.Primero
			r.Primero.Izquierdo = nuevoNodo.Derecho
			r.Primero.Anterior = nuevoNodo
			r.Primero = nuevoNodo
			r.Contador += 1
		} else if r.Primero.Siguiente != nil {
			if r.Primero.Siguiente.Valor > nuevoNodo.Valor {
				nuevoNodo.Siguiente = r.Primero.Siguiente
				nuevoNodo.Anterior = r.Primero
				r.Primero.Siguiente.Izquierdo = nuevoNodo.Derecho
				r.Primero.Derecho = nuevoNodo.Izquierdo
				r.Primero.Siguiente.Anterior = nuevoNodo
				r.Primero.Siguiente = nuevoNodo
				r.Contador += 1
			} else {
				aux := r.Primero.Siguiente
				nuevoNodo.Anterior = aux
				aux.Derecho = nuevoNodo.Izquierdo
				aux.Siguiente = nuevoNodo
				r.Contador += 1
			}
		} else if r.Primero.Siguiente == nil {
			nuevoNodo.Anterior = r.Primero
			r.Primero.Derecho = nuevoNodo.Izquierdo
			r.Primero.Siguiente = nuevoNodo
			r.Contador += 1
		}
	}
}
