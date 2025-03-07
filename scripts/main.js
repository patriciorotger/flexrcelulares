document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para obtener el contenedor de productos de acuerdo con la clase que se pase como parámetro
    const obtenerContenedorProductos = (claseContenedor) => {
        const contenedor = document.querySelector(`.${claseContenedor}`);
        
        // Si no existe un contenedor con esa clase, termina la ejecución
        if (!contenedor) {
            console.error("No se encontró el contenedor de productos.");
            return null;
        }
        return contenedor;
    };

    // Función para cargar productos desde JSON
    const cargarProductos = async () => {
        try {
            const response = await fetch("scripts/productos.json");
            const productos = await response.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error("Error cargando los productos:", error);
        }
    };

    // Función para mostrar los productos en el contenedor específico
    const mostrarProductos = (productos) => {
        // Aquí pasas el nombre de la clase que corresponda a la página
        const productosContainer = obtenerContenedorProductos("section2");

        // Asegurarse de que el contenedor exista antes de proceder
        if (!productosContainer) return;

        productosContainer.innerHTML = `<h3>Algunos de nuestros productos</h3>`;  // Limpiar contenido anterior
        let div = document.createElement("div");
        div.classList.add("productos-grid");

        productos.forEach((producto) => {
            div.innerHTML += `
                <article class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio}</p>
                    <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
                </article>
            `;
        });

        productosContainer.appendChild(div);
        agregarEventosCarrito();
    };

    // Función para agregar eventos a los botones de "Agregar al carrito"
    const agregarEventosCarrito = () => {
        document.querySelectorAll(".btn-agregar").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const idProducto = parseInt(e.target.dataset.id);
                agregarAlCarrito(idProducto);
            });
        });
    };

    // Función para agregar un producto al carrito
    const agregarAlCarrito = (id) => {
        fetch("scripts/productos.json")
            .then((res) => res.json())
            .then((productos) => {
                const productoSeleccionado = productos.find((p) => p.id === id);
                carrito.push(productoSeleccionado);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarMensaje(`${productoSeleccionado.nombre} agregado al carrito`);
            });
    };

    // Función para mostrar una alerta con SweetAlert2
    const mostrarMensaje = (mensaje) => {
        Swal.fire({
            title: "¡Éxito!",
            text: mensaje,
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    };

    // Cargar los productos cuando la página inicie
    cargarProductos();
});