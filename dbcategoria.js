const sql = require('mssql'); // ✅ Instancia el paquete de mssql para la conexion de la base de datos
const config = require('./dbconfig'); // ✅ importa el objeto directamente

/* TODO: Obtener todas las categorias */
async function getCategoria() {
    try {
        let pool = await sql.connect(config); //Conecta a la base de datos
        let categorias = await pool.request().query('SP_L_CATEGORIA_01'); // ajusta el nombre de la tabla si es diferente
        return categorias.recordset; //Devuelve el resultado de la consulta
    } catch (err) {
        console.error('Error al obtener categorías:', err);
        throw err;
    }
}

/* TODO: Obtener una categoría según id */
async function getCategoria_x_id(cat_id) {
    try {
        let pool = await sql.connect(config);
        let categorias = await pool.request()
                        .input('input_parameter', sql.Int, cat_id)
                        .query('SELECT * FROM categoria WHERE cat_id = @input_parameter'); // ajusta el nombre de la tabla si es diferente
        return categorias.recordset; //Devuelve el resultado de la consulta
    } catch (err) {
        console.error('Error al obtener categoría por ID:', err);
        throw err;
    }
}

/* TODO: Insertar una nueva categoría */
async function insertCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('cat_nombre', sql.VarChar, categoria.cat_nombre) // Insertar el nombre
            .input('cat_obs', sql.VarChar, categoria.cat_obs) // Insertar el obs
            .input('estado', sql.Int, categoria.estado)  // Insertar el estado
            .execute('SP_I_CATEGORIA_01');  // Procedimiento almacenado esté correctamente definido

        return result.recordset;  // Devuelve el resultado
    } catch (error) {
        console.error('Error en la inserción:', error);
        throw new Error('Error en la base de datos: ' + error.message);  // Lanzar el error para manejarlo en el controlador
    }
}

/* TODO: Actualiza una categoría según id */
async function updateCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('cat_id', sql.Int, categoria.cat_id)
            .input('cat_nombre', sql.VarChar, categoria.cat_nombre)
            .input('cat_obs', sql.VarChar, categoria.cat_obs)
            .input('estado', sql.Int, categoria.estado)
            .execute('SP_U_CATEGORIA_01');

        return result.recordset;
    } catch (error) {
        console.error('Error en la actualización:', error);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

/* TODO: Eliminar una categoría según id */
async function deleteCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('cat_id', sql.Int, categoria.cat_id)
            .input('estado', sql.Int, categoria.estado) // .input('estado', sql.Int, categoria.estado ?? 0) // Si no se proporciona, se establece en 0
            .execute('SP_D_CATEGORIA_01');

        return result.recordset;
    } catch (error) {
        console.error('Error en la eliminación:', error);
        throw new Error('Error en la base de datos: ' + error.message);
    }
}

/* TODO: modulos permite acceder externamente */
module.exports = { 
    getCategoria,
    getCategoria_x_id,
    insertCategoria,
    updateCategoria,
    deleteCategoria }; //Exporta la función getCategoria para que pueda ser utilizada en otros archivos