package arbolb

type NodoB struct {
	Valor     int
	Siguiente *NodoB
	Anterior  *NodoB
	Izquierdo *RamaB
	Derecho   *RamaB
}
