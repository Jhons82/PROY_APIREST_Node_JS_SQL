// Categoria.js
const dbCategoria = require('./dbcategoria');  // Asegúrate de que esta función exista

class Categoria {
    constructor(cat_nombre, cat_obs, estado) {
        this.cat_id = null;  // Se define pero no se usa en insertar()
        this.cat_nombre = cat_nombre;
        this.cat_obs = cat_obs;
        this.estado = estado;  // Nuevo campo estado
    }

    // Setter opcional para asignar el ID después
    setId(cat_id) {
        this.cat_id = cat_id;
    }

    /* TODO: Función para manejar la inserción asíncrona - Método async */
    async insertar() {
        try {
            const resultado = await dbCategoria.insertCategoria({
                cat_nombre: this.cat_nombre,
                cat_obs: this.cat_obs,
                estado: this.estado  // Pasamos el estado a la función de base de datos
            });
            return resultado;  // Si la inserción es exitosa, se devuelve el resultado
        } catch (error) {
            console.error('Error al insertar la categoría:', error);
            throw new Error('Error al insertar la categoría: ' + error.message);  // Lanzamos el error para ser manejado en el controlador
        }
    }

    /* TODO: Función para manejar la actualización asíncrona - Método async */
    async actualizar() {
        if (!this.cat_id) {
            throw new Error('Se requiere cat_id para actualizar la categoría');
        }
        try {
            const resultado = await dbCategoria.updateCategoria({
                cat_id: this.cat_id,
                cat_nombre: this.cat_nombre,
                cat_obs: this.cat_obs,
                estado: this.estado
            });
            return resultado;  // Si la actualización es exitosa, se devuelve el resultado
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
            throw new Error('Error al actualizar la categoría: ' + error.message);  // Lanzamos el error para ser manejado en el controlador
        }
    }

    /* TODO: Función para manejar la eliminación asíncrona - Método async */
    async eliminar() {
        if (!this.cat_id) {
            throw new Error('Se requiere cat_id para eliminar la categoría');
        }
        try {
            const resultado = await dbCategoria.deleteCategoria({
                cat_id: this.cat_id,
                estado: this.estado ?? 0 // Si no se proporciona estado, se establece en 0 por defecto
            });
            return resultado;  // Si la eliminación es exitosa, se devuelve el resultado
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            throw new Error('Error al eliminar la categoría: ' + error.message);  // Lanzamos el error para ser manejado en el controlador
        }
    }
}

module.exports = Categoria;
