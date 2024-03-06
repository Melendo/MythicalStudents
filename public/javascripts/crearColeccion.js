$(document).ready(function() {

    $("#formularioCrearColeccion").submit(function(event) {
        event.preventDefault();
        var nombre = $('#nombreColeccion').val();
        var descripcion = $('#descripcionColeccion').val();
        var imagen = $('#imagenColeccion')[0].files[0];
        var categorias = $('#categoriasColeccion').val();
        categorias = categorias.join(','); // Convertir a cadena separada por comas
        validarFormCrearColeccion(nombre, descripcion, imagen, categorias);
    })

    function validarFormCrearColeccion(nombre, descripcion, imagen, categorias) {
        consultarNombreColeccion(nombre)
            .then(function(existe) {
                if (!existe) {
                    insertarColeccion(nombre, descripcion, imagen, categorias);
                } else {
                    alert("El nombre de la colección ya existe en la base de datos");
                    // Aquí puedes mostrar algún mensaje de error al usuario si lo deseas
                }
            })
            .catch(function(error) {
                console.error("Error al validar el formulario:", error);
                // Aquí puedes manejar el error de la manera que desees
            });
    }
    
    function consultarNombreColeccion(nombre) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: "/crearColeccion/consultarNombre",
                type: "GET",
                data: { nombre: nombre }, // Debes enviar los datos en un objeto
                success: function(existe) {
                    resolve(existe);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    
    }
    
    function insertarColeccion(nombre, descripcion, imagen, categorias) {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);
        formData.append('categorias', categorias);
        
        $.ajax({
            type: 'POST',
            url: '/crearColeccion/insertarColeccion',
            processData: false,
            contentType: false,
            data: formData,
            success: function(insertado) {
                alert('¡Colección creada con éxito!');
            },
            error: function(error) {
                console.error("Error al insertar la colección:", error);
                alert('Ha ocurrido un error al crear la colección.\n');
            }
        });
    }
});
