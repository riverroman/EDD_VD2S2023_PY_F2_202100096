package tablahash

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
)

type TablasHash struct {
	Tabla       map[int]NodoHash
	Capacidad   int
	Utilizacion int
}

func (t *TablasHash) calculIndice(carnet int) int {
	var numeros []int

	for {
		if carnet > 0 {
			digito := carnet % 10
			numeros = append([]int{digito}, numeros...)
			carnet = carnet / 10
		} else {
			break
		}
	}
	var numeros_ascii []rune

	for _, numero := range numeros {
		valor := rune(numero + 48)
		numeros_ascii = append(numeros_ascii, valor)
	}

	final := 0
	for _, numero_ascii := range numeros_ascii {
		final += int(numero_ascii)
	}

	indice := final % t.Capacidad
	return indice
}

func (t *TablasHash) capacidadTabla() {
	auxCap := float64(t.Capacidad) * 0.6
	if t.Utilizacion > int(auxCap) {
		auxAnterior := t.Capacidad
		t.Capacidad = t.nuevaCapacidad()
		t.Utilizacion = 0
		t.reInsertar(auxAnterior)
	}
}

func (t *TablasHash) nuevaCapacidad() int {
	contador := 0
	a, b := 0, 1
	for contador < 50 {
		contador += 1
		if a > t.Capacidad {
			return a
		}
		a, b = b, a+b
	}
	return a
}

func (t *TablasHash) reInsertar(capacidadAnterior int) {
	auxTabla := t.Tabla
	t.Tabla = make(map[int]NodoHash)
	for i := 0; i < capacidadAnterior; i++ {
		if usuario, existe := auxTabla[i]; existe {
			t.Insertar(usuario.Persona.Carnet, usuario.Persona.Nombre, usuario.Persona.Password, usuario.Persona.Curso1, usuario.Persona.Curso2, usuario.Persona.Curso3)
		}
	}
}

func (t *TablasHash) reCalculoIndice(carnet int, contador int) int {
	nuevoIndice := t.calculIndice(carnet) + (contador * contador)
	return t.nuevoIndice(nuevoIndice)
}

func (t *TablasHash) nuevoIndice(nuevoIndice int) int {
	nuevoPosicion := 0
	if nuevoIndice < t.Capacidad {
		nuevoPosicion = nuevoIndice
	} else {
		nuevoPosicion = nuevoIndice - t.Capacidad
		nuevoPosicion = t.nuevoIndice(nuevoPosicion)
	}
	return nuevoPosicion
}

func (t *TablasHash) Insertar(carnet int, nombre string, password string, curso1 string, curso2 string, curso3 string) {
	indice := t.calculIndice(carnet)
	nuevoNodo := &NodoHash{Llave: indice, Persona: &Persona{Carnet: carnet, Nombre: nombre, Password: password, Curso1: curso1, Curso2: curso2, Curso3: curso3}}
	if indice < t.Capacidad {
		if _, existe := t.Tabla[indice]; !existe {
			t.Tabla[indice] = *nuevoNodo
			t.Utilizacion += 1
			t.capacidadTabla()
		} else {
			contador := 1
			indice = t.reCalculoIndice(carnet, contador)
			for {
				if _, existe := t.Tabla[indice]; existe {
					contador++
					indice = t.reCalculoIndice(carnet, contador)
				} else {
					nuevoNodo.Llave = indice
					t.Tabla[indice] = *nuevoNodo
					t.Utilizacion += 1
					t.capacidadTabla()
					break
				}
			}
		}
	}
}

func (t *TablasHash) LeerCSV(ruta string) {
	file, err := os.Open(ruta)
	if err != nil {
		fmt.Println("No pude abrir el archivo")
		return
	}
	defer file.Close()

	lectura := csv.NewReader(file)
	lectura.Comma = ','
	encabezado := true
	for {
		linea, err := lectura.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("No pude leer la linea del csv")
			continue
		}
		if encabezado {
			encabezado = false
			continue
		}
		valor, _ := strconv.Atoi(linea[0])
		t.Insertar(valor, linea[1], linea[2], linea[3], linea[4], linea[5])
	}
}
