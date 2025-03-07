// Definir productos y carrito globalmente
let productos = [];
let carrito = [];

// Función para cargar los productos desde el archivo JSON
function cargarProductos() {
    fetch('../scripts/celulares.json')  // Ruta del archivo JSON
        .then(response => response.json())
        .then(data => {
            productos = data.productos;  // Asignar los productos desde la clave 'productos'
            mostrarProductos();  // Mostrar los productos en la página
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para mostrar los productos en la página
function mostrarProductos() {
    const contenedor = document.querySelector('.section-celulares');
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
        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(prod => prod.id === idProducto);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;  // Si ya existe, aumentar la cantidad
        } else {
            // Si no existe, agregarlo al carrito con cantidad 1
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Mostrar alerta con el producto agregado al carrito
        Swal.fire({
            title: 'Producto agregado al carrito',
            text: `${producto.nombre} ha sido agregado. ¡Haz tu compra ahora!`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Actualizar el carrito
        actualizarCarrito();
    }
}

// Función para actualizar el carrito en la página
function actualizarCarrito() {
    const listaCarrito = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');
    const finalizarCompraButton = document.getElementById('finalizar-compra');

    listaCarrito.innerHTML = '';  // Limpiar el carrito

    let total = 0;
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        
        // Agregar botón de eliminar
        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.classList.add('eliminar-producto');
        eliminarButton.setAttribute('data-id', producto.id);
        eliminarButton.addEventListener('click', eliminarDelCarrito);

        li.appendChild(eliminarButton);
        listaCarrito.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Habilitar el botón de finalizar compra si hay productos en el carrito
    finalizarCompraButton.disabled = carrito.length === 0;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(event) {
    const idProducto = event.target.getAttribute('data-id');
    
    // Filtrar el producto para eliminarlo
    carrito = carrito.filter(prod => prod.id !== idProducto);

    // Actualizar el carrito después de eliminar el producto
    actualizarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    // Aquí puedes agregar la lógica para proceder al pago o mostrar un mensaje
    Swal.fire({
        title: 'Compra realizada',
        text: 'Gracias por tu compra. Te contactaremos pronto.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    // Vaciar el carrito después de la compra
    carrito = [];
    actualizarCarrito();
}

// Llamar la función para cargar los productos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarProductos);

// Agregar evento al botón de finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);