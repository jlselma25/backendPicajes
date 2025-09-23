// dbOperations.js
const sql = require('mssql');
const { crearConfig } = require('../database/config');

async function executeQuery(query,conexion) {
    let pool;
    try {
        // Conectar a la base de datos     

      console.log('config22222 ' + conexion);
        const config = crearConfig('sa', 'pk', conexion, 'BDPicajes');
        pool = await sql.connect(config);     
        
        // Ejecutar la consulta
        const result = await sql.query(query);       
        
        return result.recordset; // Retornar los registros obtenidos
    } catch (err) {
      
        console.error('Error al ejecutar la consulta:', err);
        throw err;
    } finally {     
       
        if (pool) {
            await pool.close();
        }
    }
}

module.exports = { executeQuery };