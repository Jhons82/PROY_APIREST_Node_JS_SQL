//Requerido en todos para crear el servidor
const express = require('express');
const cors = require('cors');

const dbCategoria = require('./dbcategoria'); // asegúrate de que la ruta sea correcta
const Categoria = require('./categoria');  // Importa la clase Categoria

const app = express();
const PORT = 3000;

app.use(express.json()); // Faltante para poder leer req.body
app.use(cors());  // Habilita CORS

/* TODO: Documentación con Swagger */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API de Categorías',
            description: 'API REST (Representational State Transfer) interfaz que permite la comunicación entre sistemas, para gestionar categorías usando metódos HTTP: GET, POST, PUT, DELETE. Implementada con Node.js/Express (servidor), SQL Server para backend y documentación interactiva con Swagger para ver y probar los endpoints de la API desde un navegador web.'+'\n\n'+'Algunos enlaces útiles:'+'\n'+'- [Documentación de Swagger](https://swagger.io/specification/)'+'\n'+'- [Documentación de swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)'+'\n'+'- [Documentación de swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)'+'\n'+'- [Documentación de Swagger Editor](https://editor.swagger.io/)'+'\n'+'- [Documentación de Express](https://expressjs.com/es/4x/api.html)'+'\n'+'- [Documentación de SQL Server](https://learn.microsoft.com/es-es/sql/sql-server/?view=sql-server-ver15)',
            contact: {
                name: 'JohnGOD',
                email: 'jhon969392668@gmail.com'
            },
            version: '6.2.8',
        },
        servers: [
            {
                url: 'http://localhost:3000/api-docs',
                /* description: 'Servidor de desarrollo' */
            }
        ],
        tags: [
            {
                name: 'Categoría',
                description: 'Gestión de Categorías',
                externalDocs: {
                    description: 'Más',
                    url: 'https://swagger.io/specification/',
                }
            }
        ],
        paths: {
            '/categorias': {
                get: {
                    tags: ['Categoría'],
                    summary: 'Obtener todas las categorías',
                    description: 'Devuelve todas las categorías',
                    responses: {
                        '200': {
                            description: 'Lista de categorias',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                cat_id: {
                                                    type: 'integer',
                                                    description: 'ID de la categoría',
                                                },
                                                cat_nombre: {
                                                    type: 'string',
                                                    description: 'Nombre de la categoría',
                                                },
                                                cat_obs: {
                                                    type: 'string',
                                                    description: 'Observación o descripción de la categoría',
                                                },
                                                estado: {
                                                    type: 'integer',
                                                    description: 'Estado de la categoría (1: activo, 0: inactivo)',
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/categorias/{id}': {
                get: {
                    tags: ['Categoría'],
                    summary: 'Obtener categoría por ID',
                    description: 'Devuelve una categoría específica por su ID',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            description: 'ID de la categoría a obtener',
                            schema: {
                                type: 'integer',
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Categoría encontrada',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            cat_id: {
                                                type: 'integer',
                                                description: 'ID de la categoría',
                                            },
                                            cat_nombre: {
                                                type: 'string',
                                                description: 'Nombre de la categoría',
                                            },
                                            cat_obs: {
                                                type: 'string',
                                                description: 'Observación o descripción de la categoría',
                                            },
                                            estado: {
                                                type: 'integer',
                                                description: 'Estado de la categoría (1: activo, 0: inactivo)',
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            descripción: 'ID no válido',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string',
                                                description: 'Mensaje de error',
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Categoría no encontrada'
                        }
                    }
                }
            },
            '/categoria/guardar': {
                post: {
                    tags: ['Categoría'],
                    summary: 'Registrar una nueva categoría',
                    description: 'Crea una nueva categoría en la base de datos',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema:{
                                    type: 'object',
                                    properties: {
                                        cat_nombre: {
                                            type: 'string',
                                            description: 'Nombre de la categoría',
                                        },
                                        cat_obs: {
                                            type: 'string',
                                            description: 'Observación o descripción de la categoría',
                                        },
                                        estado: {
                                            type: 'integer',
                                            description: 'Estado de la categoría (1: activo, 0: inactivo)',
                                        }
                                    }
                                },
                                example: {
                                    cat_nombre: 'Nombre de la categoría',
                                    cat_obs: 'Descripción de la categoría',
                                    estado: 1 // 1 para activo, 0 para inactivo
                                },
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Categoría creada exitosamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación',
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de éxito',
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    cat_id: {
                                                        type: 'integer',
                                                        description: 'ID de la categoría creada',
                                                    },
                                                    cat_nombre: {
                                                        type: 'string',
                                                        description: 'Nombre de la categoría',
                                                    },
                                                    cat_obs: {
                                                        type: 'string',
                                                        description: 'Observación o descripción de la categoría',
                                                    },
                                                    estado: {
                                                        type: 'integer',
                                                        description: 'Estado de la categoría (1: activo, 0: inactivo)',
                                                    }
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Error de validación',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/categoria/actualizar': {
                put: {
                    tags: ['Categoría'],
                    summary: 'Actualizar una categoría existente',
                    description: 'Actualiza los detalles de una categoría existente en la base de datos',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema:{
                                    type: 'object',
                                    properties: {
                                        cat_id: {
                                            type: 'integer',
                                            description: 'ID de la categoría a actualizar',
                                        },
                                        cat_nombre: {
                                            type: 'string',
                                            description: 'Nombre de la categoría',
                                        },
                                        cat_obs: {
                                            type: 'string',
                                            description: 'Observación o descripción de la categoría',
                                        },
                                        estado: {
                                            type: 'integer',
                                            description: 'Estado de la categoría (1: activo, 0: inactivo)',
                                        }
                                    }
                                },
                                example: {
                                    cat_id: 1,
                                    cat_nombre: 'Nombre actualizado',
                                    cat_obs: 'Descripción actualizada',
                                    estado: 1 // 1 para activo, 0 para inactivo
                                },
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Categoría actualizada exitosamente',
                            content: {
                                'application/json': {
                                    schema:{
                                        type:'object',
                                        properties:{
                                            status:{
                                                type:'string',
                                                description:'Estado de la operación'
                                            },
                                            mensaje:{
                                                type:'string',
                                                description:'Mensaje de éxito'
                                            },
                                            data:{
                                                type:'object',
                                                properties:{
                                                    cat_id:{
                                                        type:'integer',
                                                        description:'ID de la categoría actualizada'
                                                    },
                                                    cat_nombre:{
                                                        type:'string',
                                                        description:'Nombre de la categoría'
                                                    },
                                                    cat_obs:{
                                                        type:'string',
                                                        description:'Observación o descripción de la categoría'
                                                    },
                                                    estado:{
                                                        type:'integer',
                                                        description:'Estado de la categoría (1: activo, 0: inactivo)'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Error de validación o ID no válido'
                        },
                        '404': {
                            description: 'Categoría no encontrada'
                        }
                    }
                }
            },
            '/categoria/eliminar': {
                delete: {
                    tags: ['Categoría'],
                    summary: 'Eliminar una categoría existente',
                    description: 'Elimina una categoría existente de la base de datos',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        cat_id: {
                                            type: 'integer',
                                            description: 'ID de la categoría a eliminar'
                                        }
                                    }
                                }
                            }
                        },
                        example: {
                            cat_id: 1 // ID de la categoría a eliminar
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Categoría eliminada exitosamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de éxito',
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    cat_id: {
                                                        type: 'integer',
                                                        description: 'ID de la categoría eliminada',
                                                    },
                                                    cat_nombre: {
                                                        type: 'string',
                                                        description: 'Nombre de la categoría',
                                                    },
                                                    cat_obs: {
                                                        type: 'string',
                                                        description: 'Observación o descripción de la categoría',
                                                    },
                                                    estado: {
                                                        type: 'integer',
                                                        description: 'Estado de la categoría (1: activo, 0: inactivo)'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Error de validación o ID no válido',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'String',
                                                drescription: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'Categoría no encontrada',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: 'Error interno del servidor',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '503': {
                            description: 'Servicio no disponible',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '504': {
                            description: 'Tiempo de espera agotado',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '511': {
                            description: 'Autenticación requerida',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '429': {
                            description: 'Demasiadas solicitudes',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '403': {
                            description: 'Acceso denegado',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '401': {
                            description: 'No autorizado',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                description: 'Estado de la operación'
                                            },
                                            mensaje: {
                                                type: 'string',
                                                description: 'Mensaje de error'
                                            },
                                            detalles: {
                                                type: 'string',
                                                description: 'Detalles del error'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            schemas: {
                Categoria: {
                    type: 'object',
                    properties: {
                        cat_id: {
                            type: 'integer',
                            description: 'ID de la categoría'
                        },
                        cat_nombre: {
                            type: 'string',
                            description: 'Nombre de la categoría'
                        },
                        cat_obs: {
                            type: 'string',
                            description: 'Observación o descripción de la categoría'
                        },
                        estado: {
                            type: 'integer',
                            description: 'Estado de la categoría (1: activo, 0: inactivo)'
                        }
                    }
                }
            }
        }
    },
    apis: ['./api.js'], // Ruta a tus archivos de definición de API
};

/* TODO: Especificación OpenAPI */
const openapiEspecification = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiEspecification, { explorer: true }));

/* TODO: Ruta para todas las categorias - Enviar un post */
app.get('/categorias', async (req, res) => {
    try {
        const categorias = await dbCategoria.getCategoria();
        res.json(categorias);
    } catch (error) {
        res.status(500).send('Error al obtener categorías');
    }
});

/* TODO: Ruta para una categoría - Enviar un post */
app.get('/categorias/:id', async (req, res) => {
    try {
        const categorias = await dbCategoria.getCategoria_x_id(req.params.id);
        if (!categorias) {
            return res.status(404).send('Categoría no encontrada');
        }
        res.json(categorias);
    }catch (error) {
        res.status(500).send('Error al obtener categoría por ID')
    }
});

/* TODO: Ruta para registro de categoría - Enviar un post */
app.post('/categoria/guardar', async (req, res) => {
    try {
        // Log para inspeccionar el cuerpo de la solicitud
        console.log('Cuerpo de la solicitud:', req.body);

        // Desestructurar los parámetros del cuerpo de la solicitud
        const { cat_nombre, cat_obs, estado } = req.body;

        // Validación de los datos de entrada
        if (!cat_nombre || !cat_obs) {
            return res.status(400).json({ 
                status: 'error', 
                mensaje: 'El nombre y la descripción son requeridos.' 
            });
        }

        // Crear una instancia de la clase Categoria
        const nuevaCategoria = new Categoria(cat_nombre, cat_obs, estado);  // Asignar valor por defecto 'activo' si no se pasa
        console.log('Categoria creada:', nuevaCategoria);

        // Insertar la categoría en la base de datos
        const resultado = await nuevaCategoria.insertar();
        console.log('Resultado de la inserción:', resultado);

        // Responder con éxito
        return res.status(201).json({
            status: 'success',
            mensaje: 'Categoría creada exitosamente',
            data: resultado
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);

        // Verificar el tipo de error
        if (error.message.includes('Error al insertar la categoría')) {
            return res.status(500).json({
                status: 'error',
                mensaje: 'Error interno al insertar la categoría. Por favor, intente más tarde.',
                detalles: error.message
            });
        }

        return res.status(500).json({
            status: 'error',
            mensaje: 'Error inesperado en el servidor.',
            detalles: error.message
        });
    }
});

/* TODO: Actualizar la categoría */
app.put('/categoria/actualizar', async (req, res) => {
    try {
        // Desestructurar los parámetros del cuerpo de la solicitud
        const {cat_id, cat_nombre, cat_obs, estado} = req.body;
        // Crear una instancia de la clase Categoria
        const actualizarCategoria = new Categoria(cat_nombre, cat_obs, estado);
        actualizarCategoria.setId(cat_id); // Asignar el ID a la instancia
        // Actulizar la categoría en la base de datos
        const resultado = await actualizarCategoria.actualizar();

        return res.status(200).json({
            status: 'success',
            mensaje: 'Categoría actualizada exitosamente',
            data: resultado
        })

    } catch (error) {
        if (error.message.includes('Error al actualizar la categoría')) {
            return res.status(500).json({
                status: 'error',
                mensaje: 'Error interno al actualizar la categoría. Por favor, intente más tarde',
                detalles: error.message
            });
        }

        return res.status(500).json({
            status: 'error',
            mensaje: 'Error inesperado en el servidor.',
            detalles: error.message
        });
    }
});

/* TODO: Eliminar la categoría */
app.delete('/categoria/eliminar', async (req, res) => {
    try {
        const {cat_id, estado} = req.body;
        const eliminarCategoria = new Categoria(cat_id, estado);
        eliminarCategoria.setId(cat_id);
        const resultado = await eliminarCategoria.eliminar();

        return res.status(200).json({
            status: 'success',
            mensaje: 'Categoría eliminada exitosamente',
            data: resultado
        })
    } catch (error) {
        if (error.message.includes('Error al eliminar la categoría')) {
            return res.status(500).json({
                status: 'error',
                mensaje: 'Error interno al eliminar la categoría. Por favor, intente más tarde',
                detalles: error.message
            })
        }

        return res.status(500).json({
            status: 'error',
            mensaje: 'Error inesperado en el servidor.',
            detalles: error.message
        })
    }
});
/* TODO: Puerto de lanzamiento */
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});