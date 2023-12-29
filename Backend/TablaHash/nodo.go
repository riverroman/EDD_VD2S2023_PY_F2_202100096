package tablahash

type Persona struct {
	Carnet   int
	Nombre   string
	Password string
	Curso1   string
	Curso2   string
	Curso3   string
}

type NodoHash struct {
	Llave   int
	Persona *Persona
}

type peticionLogin struct {
	UserName string
	Password string
}
