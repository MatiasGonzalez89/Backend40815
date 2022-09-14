const express = require("express")
const app = express()
const router = express.Router()
const PORT = 8082
const routes = require("./routes/routes")

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const server = app.listen(PORT, () => {
    console.log('servidor levantado' + server.address().port)
})

app.use('/api/productos', routes)

app.get('/api', (req, res) => {
    res.sendFile(__dirname + 'index.html')
})

