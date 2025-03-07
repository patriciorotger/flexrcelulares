// Definir productos globalmente
let productos = [];

// Función para cargar los productos desde el archivo JSON
function cargarProductos() {
    fetch('../scripts/bazar.json')  // Ruta del archivo JSON
        .then(response => response.json())
        .then(data => {
            productos = data;  // Asignar los datos a la variable productos
            mostrarProductos(data);  // Mostrar los productos en la página
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
    const contenedor = document.querySelector('.bazar-section');
    contenedor.innerHTML = '';  // Limpiar el contenedor antes de agregar los productos

    productos.forEach(producto => {
        const articulo = document.createElement('article');
        articulo.classList.add('producto');
        
        articulo.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
        `;

        contenedor.appendChild(articulo);
    });

    // Agregar eventos a los botones "Agregar al carrito"
    const botones = document.querySelectorAll('.agregar-carrito');
    botones.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    const idProducto = event.target.getAttribute('data-id');
    const producto = productos.find(prod => prod.id === idProducto);

    if (producto) {
        // Mostrar alerta con el producto agregado al carrito
        Swal.fire({
            title: 'Producto agregado al carrito',
            text: `${producto.nombre} ha sido agregado. ¡Haz tu compra ahora!`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Llamar la función para cargar los productos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarProductos);