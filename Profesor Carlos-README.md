# Trello
TAREA CLON TRELLO

Registro y Login funcionan.
Sesiones funcionan y redirecciona al accesar areas no autorizadas.
Se pueden agregar proyectos con descripcion y nombre.

El codigo no tiene la funcion de agregar listas individuales a proyectos pero se pueden mostrar en el frontend y cargan de forma apropiada,

Las listas contienen usuarios, descripciones y nombres, las sublistas tambien contienen descripcion y nombre.

Las listas son llevadas a los usuarios mediante su ID de usuario unico, la funcionalidad de ver listas no creadas por el usuario no 
la implemente.

Si desea ver las listas en la base de datos con todos sus componentes en su totalidad se puede hacer
haciendo POST a http://localhost:9999/projects/Test y usando este json.



{
    "name": "John Deere",
    "description": "First test",
    "creator": "$$$$$$$$", ############### "creator" lleva el ID unico del usuario proporcionado en la base de datos que utiliza el mismo nombre "creator"#####  
    "users": [
        {
            "user": "First User"
        },
        {
            "user": "Second User"
        }
    ],
    "lists": [
        {
            "name": "First List",
            "description": "First List Description",
            "sublists": [
                {
                    "name": "Sublist 1",
                    "description": "Description of Sublist 1"
                },
                {
                    "name": "Sublist 2",
                    "description": "Description of Sublist 2"
                }
            ]
        },
        {
            "name": "Second List",
            "description": "Second List Description",
            "sublists": [
                {
                    "name": "Sublist 3",
                    "description": "Description of Sublist 4"
                },
                {
                    "name": "Sublist 3",
                    "description": "Description of Sublist 4"
                }
            ]
        }
    ]
}
