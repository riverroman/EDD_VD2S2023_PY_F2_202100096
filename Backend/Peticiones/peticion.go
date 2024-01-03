package peticiones

type PeticionLogin struct {
	UserName string
	Password string
	Tutor    bool
	Alumno   bool
	Admin    bool
}

type PeticionRegistroTutor struct {
	Carnet   int
	Nombre   string
	Curso    string
	Password string
}

type PeticionRegistroAlumno struct {
	Carnet   int
	Nombre   string
	Password string
	Curso1   string
	Curso2   string
	Curso3   string
}

type PeticionCursos struct {
	Cursos []Cursos
}

type Cursos struct {
	Codigo string
	Post   []string
}
