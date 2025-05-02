<!-- TODO: Route - Get All Categories
 -->
http://localhost:3000/categorias

<!-- TODO: Route - Get a Category -->

http://localhost:3000/categorias/1

<!-- TODO: Route - Post Insertion Category -->

http://localhost:3000/categoria/guardar

POST -> raw -> JSON

{
    "cat_nombre": "Electro nuevo", 
    "cat_obs": "Categoría de productos nuevo", 
    "estado": "1"
}

<!-- TODO: Route - Post Update Category -->

http://localhost:3000/categoria/actualizar

PUT -> raw -> JSON

{
    "cat_id": "4",
    "cat_nombre": "Electro Actualizado", 
    "cat_obs": "Categoría actualizada", 
    "estado": "1"
}

<!-- TODO: Route - Post delete Category -->

http://localhost:3000/categoria/eliminar

DELETE -> raw -> JSON

{
  "cat_id": 5
}