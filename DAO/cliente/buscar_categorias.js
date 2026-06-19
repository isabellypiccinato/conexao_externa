import {conexao} from '../conexao.js'


async function buscarClientes3(){
  console.log('DAO de CLIENTE')
    const sql = `SELECT * tbl_categorias;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

async function buscarCliente3(codigo){
    const sql = `SELECT * FROM tbl_categorias WHERE codigo = ?`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [codigo]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

export {buscarClientes3, buscarCliente3}