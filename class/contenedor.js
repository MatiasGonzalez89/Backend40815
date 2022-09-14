const fs = require("fs")

const productos = [{
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "http://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 500.40,
        "thumbnail": "http://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    },
    {
        "title": "Globo terraqueo",
        "price": 402.50,
        "thumbnail": "http://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geography-planet-school-256.png",
        "id": 3
    }
]

class Contenedor {
    constructor(desafio) {
        this.desafio = desafio
        this.itemList = productos
    }

    //Metodos

    //Recibe un producto y lo agrega al array itemList

    async post(producto) {
        const contenido = await this.getAll()
        const indice = contenido.sort((a, b) => b.id - a.id)[0].id
        producto.id = indice + 1
        contenido.push(producto)
        this.itemList = contenido
        console.log("Producto ingresado")
        return producto.id
    }

    //Reemplaza un producto en base a su id
    async put(id, producto) {
        try {
            const contenido = await this.getAll()
            const index = contenido.findIndex((producto) => producto.id === id)
            if (index >= 0) {
                contenido.splice(index, 1, {
                    ...producto,
                    id
                })
                this.itemList = contenido
                return producto
            } else {
                console.log(`Producto con id: ${producto.id} no existe`)
                return null
            }
        } catch (e) {
            console.log("No se encontró un producto con ese id")
            return e
        }
    }

    //Reibe un id y devuelve el objeto con ese id o null si no esta.
    async getById(id) {
        try {
            const contenido = await this.getAll()
            const productoBuscado = contenido.filter((producto) => producto.id == id)
            if (productoBuscado != 0) {
                return productoBuscado
            } else {
                console.log("Producto no encontrado")
                return null
            }
        } catch (e) {
            console.log("Producto no encontrado", e)
            return e
        }
    }

    //Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            const contenido =  this.itemList
            return contenido
        } catch (e) {
            console.log(e)
        }
    }

    //Elimina un producto segun su id
    async deleteById(id) {
        try {
            const contenido = await this.getAll()
            const idBuscado = contenido.filter((producto) => producto.id != id)
            this.itemList = idBuscado
            console.log("Producto eliminado")
            return id
        } catch(e){
            console.log(e)
        }
    }
}

module.exports = Contenedor