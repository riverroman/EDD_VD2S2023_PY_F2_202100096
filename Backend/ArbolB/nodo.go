package arbolb

type Tutores struct {
	Carnet   int
	Nombre   string
	Curso    string
	Password string
}

type NodoB struct {
	Valor     *Tutores
	Siguiente *NodoB
	Anterior  *NodoB
	Izquierdo *RamaB
	Derecho   *RamaB
}
