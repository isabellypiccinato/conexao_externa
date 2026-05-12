
import express from 'express'

const app = express()

app.get('/', (req, res) =>{
    res.json('Ola Mundo ...')
})

app.get('/cliente', async (req, res) =>{
    let produtos = await listarProdutos()
    res.json(produtos)
})

app.post('/cliente', async (req, res) =>{
    let produtos = await listarProdutos()
    res.json(produtos)
})

app.put('/cliente', async (req, res) =>{
    let produtos = await listarProdutos()
    res.json(produtos)
})

app.delete('/cliente', async (req, res) =>{
    let produtos = await listarProdutos()
    res.json(produtos)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})