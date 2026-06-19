import express from 'express'
// Importando as funções lógicas do banco de dados (vamos criá-las no passo abaixo)
import { buscarCliente1, buscarClientes1, buscarClientePorId, inserirCliente, atualizarCliente, deletarCliente } from './DAO/clienteDAO.js'

const app = express()

// Middleware obrigatório para o Express conseguir ler o corpo (body) das requisições em formato JSON
app.use(express.json())

// Rota Base
app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Estacionamento Rodando perfeitamente!' })
})

// 1. CONSULTAR TODOS (GET)
app.get('/cliente', async (req, res) => {
    try {
        const clientes = await buscarClientes1()
        res.json(clientes)
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar clientes', detalhes: erro.message })
    }
})

// 1. CONSULTAR TODOS (GET)
app.get('/status', async (req, res) => {
    try {
        const status= await listarClientes()
        res.json(status)
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar status', detalhes: erro.message })
    }
})

// 2. CONSULTAR POR ID (GET)
app.get('/cliente/:id', async (req, res) => {
    try {
        const { id } = req.params
        const cliente = await buscarClientePorId(id)
        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado' })
        }
        res.json(cliente)
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar cliente', detalhes: erro.message })
    }
})

// 3. INCLUSÃO / CADASTRO (POST)
app.post('/cliente', async (req, res) => {
    try {
        const { nome, telefone, email } = req.body // Dados vindo do cliente (Postman/Insomnia)
        
        if (!nome) {
            return res.status(400).json({ erro: 'O campo nome é obrigatório.' })
        }

        const resultado = await inserirCliente({ nome, telefone, email })
        res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!', id: resultado.insertId })
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao inserir cliente', detalhes: erro.message })
    }
})

// 4. ATUALIZAÇÃO (PUT)
app.put('/cliente/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, telefone, email } = req.body

        const resultado = await atualizarCliente(id, { nome, telefone, email })
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado para atualização.' })
        }

        res.json({ mensagem: 'Cliente atualizado com sucesso!' })
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar cliente', detalhes: erro.message })
    }
})

// 5. DELEÇÃO (DELETE)
app.delete('/cliente/:id', async (req, res) => {
    try {
        const { id } = req.params
        const resultado = await deletarCliente(id)

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado para exclusão.' })
        }

        res.json({ mensagem: `Cliente com ID ${id} deletado com sucesso!` })
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao deletar cliente', detalhes: erro.message })
    }
})

// Inicialização do Servidor
app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000')
})
