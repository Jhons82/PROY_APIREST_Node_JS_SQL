<!-- TODO: Requiere realizar los siguientes configuraciones para conexión de base de datos local -->

1. Ir a Sql Server Configuration Manager.
2. Luego en SQL Server Network Configuration.
3. Luego en Protocols for SQLEXPRESS.
4. Activar TCP/IP = Enable.
5. En el mismo apartado Direcciones IP.
6. Ir a IPALL, en puerto TCP =1433 y puertos dinámicos = no ingresar nada.
7. Guardar.
8. Luego en el mismo Sql Server Configuration Manager ir a SQL Server Services
9. En SQL Server (SQLEXPRESS), reiniciar el servicio


<!-- TODO: En dbconfig -->

1. En caso de no permitir IP en "server"
2. Ingresar el Nombre del Equipo, según como este escrito en SQL server (nombre principal del contenedor de toda la info de la base de datos).
3. O puede ingresar la URL por defecto de SQL SERVER: "127.0.0.1"