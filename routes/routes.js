const express = require("express")
const routerProductos = express.Router()
const Contenedor = require("../class/contenedor")
const contenedor = new Contenedor("productos")

//Get /api/productos
routerProductos.get('/', async (req, res) => {
    const contenido = await contenedor.getAll()
    res.json(contenido)
})

//GET /api/productos/:id
routerProductos.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const contenido = await contenedor.getById(id)
    if(contenido == null){
        res.json({ error: "producto no encontrado" })
    } else {
        res.json(contenido)
    }
})

//POST /api/productos
routerProductos.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body
    const id = await contenedor.post({ title, price, thumbnail})
    res.send({ message: `Producto agregado con el id: ${id}`})
})

//PUT /api/productos/:id
routerProductos.put('/:id', async (req, res) => {
    const { title, price, thumbnail } = req.body
    const id = await contenedor.put(Number(req.params.id), {title, price, thumbnail})
    res.json(id)
})

//DELETE /api/productos/:id
routerProductos.delete('/:id', async (req, res)=> {
    const borrar = await contenedor.deleteById(Number(req.params.id))
    res.json(borrar !== null ? { message:`Se eliminó el producto con id: ${borrar}`} : { error: "Producto no encontrado"})
})

module.exports = routerProductos