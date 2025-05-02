CREATE DATABASE proy_apirest_node_sql

/* Obtener nombre de Servidor */
SELECT SERVERPROPERTY('MachineName');

/* Solicitar base de datos */
USE proy_apirest_node_sql

/* Tabla Categoría */
CREATE TABLE categoria (
	cat_id int IDENTITY(1,1) PRIMARY KEY,
	cat_nombre varchar(150) NOT NULL,
	cat_obs varchar(150) NOT NULL,
	estado int NOT NULL
);

/* Solicitar Tabla Categoría */
SELECT * FROM categoria

/* Insertar datos en la tabla Categoría */
INSERT INTO categoria (cat_nombre, cat_obs, estado) 
VALUES ('Laptops', 'Obs Laptops', '1'),
		('Televisores', 'Obs Televisores', '1');

/**************************************************************/
/********************* Storage Procedure *********************/
/*************************************************************/

/** Storage Procedure - Llamado de todas las categorias **/
CREATE PROCEDURE SP_L_CATEGORIA_01
AS
BEGIN
	SELECT * FROM categoria
END

/** Storage Procedure - Llamado de una categoría según por id **/
CREATE PROCEDURE SP_L_CATEGORIA_02
	@cat_id INT
AS
BEGIN
	SELECT * FROM categoria WHERE cat_id = @cat_id
END

/** Storage Procedure - Insertar atributos en Tabla Categoria **/
CREATE PROCEDURE SP_I_CATEGORIA_01
    @cat_nombre VARCHAR(150),
    @cat_obs VARCHAR(150),
    @estado INT  -- El valor predeterminado es 'activo'
AS
BEGIN
    INSERT INTO categoria (cat_nombre, cat_obs, estado)
    VALUES (@cat_nombre, @cat_obs, @estado);

    SELECT * FROM categoria;
END


drop procedure SP_D_CATEGORIA_01

drop table categoria

/** Storage Procedure - Actualizar atributos en Tabla Categoria **/
CREATE PROCEDURE SP_U_CATEGORIA_01
	@cat_id INT,
	@cat_nombre VARCHAR(150),
	@cat_obs VARCHAR(150),
	@estado INT
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE categoria
	SET
		cat_nombre = @cat_nombre,
		cat_obs = @cat_obs,
		estado = @estado
	WHERE
		cat_id = @cat_id

	SELECT * FROM categoria WHERE cat_id = @cat_id;
END

/** Storage Procedure - Eliminar la Categoría - Estado: 1 (Activo) || Estado: 0 (Inactivo) **/
CREATE OR ALTER PROCEDURE SP_D_CATEGORIA_01
@cat_id INT,
@estado INT = 0
AS
BEGIN
	UPDATE categoria
	SET
		estado = @estado
	WHERE 
		cat_id = @cat_id

	SELECT * FROM categoria
END

/**** Segunda forma de delete nombrando a estado = 0 desde el storage procedure *****/
CREATE OR ALTER PROCEDURE SP_D_CATEGORIA_01
    @cat_id INT,
    @estado INT = 0  -- valor por defecto si no se pasa
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Verificamos que la categoría exista
        IF EXISTS (SELECT 1 FROM categoria WHERE cat_id = @cat_id)
        BEGIN
            -- Soft delete: actualizamos el estado
            UPDATE categoria
            SET estado = @estado
            WHERE cat_id = @cat_id;

            SELECT 'Categoría actualizada correctamente' AS mensaje;
        END
        ELSE
        BEGIN
            -- Si no existe, devolvemos mensaje
            SELECT 'Categoría no encontrada' AS mensaje;
        END
    END TRY
    BEGIN CATCH
        -- Captura de errores
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Error al actualizar la categoría: %s', 16, 1, @ErrorMessage);
    END CATCH
END;