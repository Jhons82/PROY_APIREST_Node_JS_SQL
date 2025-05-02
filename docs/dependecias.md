<!-- TODO: Dependencies -->
    "express": "^4.18.2"

    Express es un framework minimalista y flexible para construir aplicaciones web y APIs en Node.js. Es muy popular por su simplicidad y gran ecosistema de middleware.

    "cors": "^2.8.5"

    cors es un paquete de Node.js que se usa con Express para habilitar CORS (Cross-Origin Resource Sharing).
    Esto permite que tu servidor acepte peticiones desde otros dominios, lo cual es súper común cuando tienes el frontend en un servidor (ej: React) y el backend en otro (Express).

    "body-parser": "^1.20.2"

    body-parser es un middleware de Node.js/Express que se encarga de leer el cuerpo de las peticiones HTTP y convertirlo a un formato que puedas usar en tu código (como JSON o datos de formularios).Antes, era un paquete separado. Hoy en día, Express ya trae funciones similares integradas, pero aún se usa body-parser por compatibilidad o preferencias.

    "mssql": "^9.1.1"

    mssql es un paquete de Node.js que te permite conectarte y trabajar con bases de datos Microsoft SQL Server desde tu aplicación.
    Es un cliente SQL muy completo para Node.js, ideal si estás usando SQL Server como base de datos en tu backend.

<!-- TODO: devDependencies -->
    "nodemon": "^2.0.22"

    Aparece normalmente en el archivo package.json de un proyecto de Node.js, específicamente dentro de la sección de dependencias de desarrollo (devDependencies). Significa que estás utilizando Nodemon en la versión 2.0.22, o cualquier versión compatible superior dentro de la misma serie de versiones.
    
    ¿Qué hace Nodemon?
    Nodemon es una herramienta que ayuda en el desarrollo de aplicaciones Node.js. Su función principal es monitorizar los archivos del proyecto y reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos. Esto es muy útil durante el desarrollo, porque no necesitas reiniciar manualmente el servidor cada vez que haces un cambio en el código.

    El símbolo ^ en la versión:
    El símbolo ^ (caret) delante del número de versión indica que se pueden instalar versiones compatibles de Nodemon, pero con la misma versión principal (2.x.x en este caso). Específicamente:
    
    ^2.0.22 significa que puede actualizarse a cualquier versión de Nodemon que esté en la serie 2 (como 2.0.30, 2.1.0, etc.), pero no a una versión 3.0.0 o superior.
    
    ¿Para qué se usa Nodemon?
    Desarrollo: Mientras estás trabajando en tu proyecto, Nodemon reinicia automáticamente tu servidor Node.js cada vez que detecta un cambio en los archivos. Esto ahorra tiempo y esfuerzo, porque no tienes que estar reiniciando el servidor manualmente cada vez que editas el código.
    
    En resumen, "nodemon": "^2.0.22" es una forma de decir que quieres usar Nodemon versión 2.0.22 o una compatible dentro de la serie 2.x.x para tu proyecto de Node.js.